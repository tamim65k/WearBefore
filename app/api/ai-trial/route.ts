import { NextRequest, NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/catalog";

type ConversationRole = "user" | "assistant";

interface ConversationMessage {
  role: ConversationRole;
  content: string;
}

interface StyleProfile {
  styleDirection?: string;
  occasion?: string;
  budget?: string;
  notes?: string;
}

interface AiTrialRequest {
  messages?: ConversationMessage[];
  selectedProductIds?: string[];
  profile?: StyleProfile;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
}

export const runtime = "nodejs";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();
const GEMINI_MODEL = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

const requestedHistoryLimit = Number(process.env.AI_TRIAL_MAX_HISTORY ?? "12");
const MAX_HISTORY =
  Number.isFinite(requestedHistoryLimit) && requestedHistoryLimit > 0
    ? Math.min(Math.floor(requestedHistoryLimit), 30)
    : 12;

function normalizeMessages(input: unknown): ConversationMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const possibleMessage = item as {
        role?: unknown;
        content?: unknown;
      };

      const role =
        possibleMessage.role === "assistant" ? "assistant" : "user";
      const content =
        typeof possibleMessage.content === "string"
          ? possibleMessage.content.trim()
          : "";

      if (!content) {
        return null;
      }

      return { role, content };
    })
    .filter((message): message is ConversationMessage => Boolean(message))
    .slice(-MAX_HISTORY);
}

function normalizeSelectedProductIds(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function normalizeProfile(input: unknown): StyleProfile {
  if (!input || typeof input !== "object") {
    return {};
  }

  const profile = input as {
    styleDirection?: unknown;
    occasion?: unknown;
    budget?: unknown;
    notes?: unknown;
  };

  return {
    styleDirection:
      typeof profile.styleDirection === "string"
        ? profile.styleDirection.trim()
        : undefined,
    occasion:
      typeof profile.occasion === "string" ? profile.occasion.trim() : undefined,
    budget: typeof profile.budget === "string" ? profile.budget.trim() : undefined,
    notes: typeof profile.notes === "string" ? profile.notes.trim() : undefined,
  };
}

function buildCatalogContext(
  selectedProductIds: string[],
  allProducts: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    sizes: string[];
    colors: string[];
    productUrl: string;
  }>,
): string {
  const selectedProducts =
    selectedProductIds.length > 0
      ? allProducts.filter((product) => selectedProductIds.includes(product.id))
      : allProducts.slice(0, 10);

  if (selectedProducts.length === 0) {
    return "No product context selected.";
  }

  return selectedProducts
    .map(
      (product) =>
        `- ${product.name} (${product.id}) | url: ${product.productUrl} | category: ${product.category} | price: $${product.price.toFixed(2)} | sizes: ${product.sizes.join(", ")} | colors: ${product.colors.join(", ")}`,
    )
    .join("\n");
}

function buildAllProductNameContext(
  allProducts: Array<{ name: string; id: string; productUrl: string }>,
) {
  return allProducts
    .map((product) => `- ${product.name} (${product.id}) => ${product.productUrl}`)
    .join("\n");
}

function buildProfileContext(profile: StyleProfile): string {
  const contextRows = [
    profile.styleDirection
      ? `Style direction: ${profile.styleDirection}`
      : null,
    profile.occasion ? `Occasion: ${profile.occasion}` : null,
    profile.budget ? `Budget: ${profile.budget}` : null,
    profile.notes ? `Additional notes: ${profile.notes}` : null,
  ].filter((row): row is string => Boolean(row));

  return contextRows.length > 0
    ? contextRows.join("\n")
    : "No profile context provided.";
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Missing GEMINI_API_KEY. Add your key to .env.local before using AI Trial.",
      },
      { status: 500 },
    );
  }

  let requestBody: AiTrialRequest;

  try {
    requestBody = (await request.json()) as AiTrialRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const messages = normalizeMessages(requestBody.messages);
  const selectedProductIds = normalizeSelectedProductIds(
    requestBody.selectedProductIds,
  );
  const profile = normalizeProfile(requestBody.profile);
  const catalogProducts = await getCatalogProducts();

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "At least one message is required." },
      { status: 400 },
    );
  }

  const systemInstruction = [
    "You are WearBefore AI Trial, a conversational fashion stylist assistant.",
    "Give practical outfit guidance grounded in the provided catalog and shopper profile.",
    "Keep responses concise, clear, and friendly. Prefer short paragraphs and direct suggestions.",
    "If details are uncertain, say so clearly instead of making up facts.",
    "Only recommend products from the provided product name list.",
    "When recommending products, mention product names exactly as provided in context and never invent product names.",
  ].join(" ");

  const contextualMessage = [
    "Shopper context:",
    buildProfileContext(profile),
    "",
    "Allowed product name list (must use exact names):",
    buildAllProductNameContext(catalogProducts),
    "",
    "Selected catalog context:",
    buildCatalogContext(selectedProductIds, catalogProducts),
  ].join("\n");

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  try {
    const geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: contextualMessage }],
          },
          ...messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
          })),
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 750,
        },
      }),
    });

    const payload = (await geminiResponse.json()) as GeminiResponse;

    if (!geminiResponse.ok) {
      const upstreamMessage =
        payload.error?.message || "Gemini request failed unexpectedly.";

      return NextResponse.json(
        { error: `Gemini API error: ${upstreamMessage}` },
        { status: 502 },
      );
    }

    const reply =
      payload.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("\n")
        .trim() || "";

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      reply,
      model: GEMINI_MODEL,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json(
      { error: `Failed to generate AI Trial response: ${message}` },
      { status: 500 },
    );
  }
}