"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Fraunces, Space_Grotesk } from "next/font/google";
import {
  Bot,
  Loader2,
  MessageCircle,
  RefreshCcw,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { products as fallbackProducts } from "@/data/products";
import { newArrivalProducts } from "@/data/newArrivals";
import { Product } from "@/types";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

type MessageRole = "user" | "assistant";
type UiLanguage = "en" | "bn";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

const PROFILE_DEFAULTS = {
  styleDirection: "Minimal Smart",
  occasion: "Office day",
  budget: "$100 - $250",
  notes: "",
};

const LOOK_SUGGESTIONS: Record<UiLanguage, string[]> = {
  en: [
    "Build me a 3-piece look for an office day under $250.",
    "I want a monochrome weekend outfit that still feels premium.",
    "Suggest one watch and one sneaker pairing for date night.",
    "I need a capsule starter kit from your current catalog.",
    "Create a travel outfit with one shirt, one pant, and one sneaker.",
    "Make me a relaxed streetwear look with a clean watch accent.",
    "Give me two color-safe outfit ideas for evening events.",
    "Recommend a smart-casual combo that works from day to night.",
  ],
  bn: [
    "$250 এর মধ্যে office day এর জন্য 3-piece look তৈরি করে দাও।",
    "একটি monochrome weekend outfit চাই, কিন্তু premium feel থাকতে হবে।",
    "date night এর জন্য একটি watch এবং একটি sneaker pairing সাজেস্ট করো।",
    "তোমাদের current catalog থেকে একটি capsule starter kit বানিয়ে দাও।",
    "travel look বানাও: একটি shirt, একটি pant, এবং একটি sneaker।",
    "একটি relaxed streetwear look দাও, সাথে clean watch accent থাকবে।",
    "evening event এর জন্য দুইটি color-safe outfit idea দাও।",
    "day থেকে night পর্যন্ত চলবে এমন একটি smart-casual combo সাজেস্ট করো।",
  ],
};

const TASK_SUGGESTIONS: Record<UiLanguage, string[]> = {
  en: [
    "Compare two sneakers and tell me which is better for all-day comfort.",
    "Find the best value pieces under $100 from my selected products.",
    "Suggest substitutions if my top pick is out of stock.",
    "Plan a 5-item capsule wardrobe with minimal overlap.",
    "Prioritize products by versatility and cost-per-wear.",
    "Give me one safe pick and one bold pick for the same occasion.",
    "Build a beginner wardrobe starting with just $300.",
    "Show me an upgrade path from budget to premium options.",
  ],
  bn: [
    "দুটি sneaker compare করে বলো, all-day comfort এর জন্য কোনটি ভালো।",
    "আমার selected products থেকে $100 এর নিচে best value pieces খুঁজে দাও।",
    "আমার top pick out of stock হলে বিকল্প সাজেস্ট করো।",
    "কম overlap রেখে 5-item capsule wardrobe plan করো।",
    "versatility এবং cost-per-wear অনুযায়ী products prioritize করো।",
    "একই occasion এর জন্য একটি safe pick এবং একটি bold pick দাও।",
    "মাত্র $300 বাজেটে beginner wardrobe শুরু করার plan দাও।",
    "budget থেকে premium-এ যাওয়ার একটি upgrade path দেখাও।",
  ],
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getWelcomeMessage(language: UiLanguage): ChatMessage {
  return {
    id: createId(),
    role: "assistant",
    content:
      language === "bn"
        ? "AI Trial-এ স্বাগতম। আমি আপনার জন্য look তৈরি করতে, product compare করতে এবং style, budget ও occasion অনুযায়ী পরামর্শ দিতে পারি। একটি প্রশ্ন লিখুন অথবা ডান পাশে থাকা starter prompt ব্যবহার করুন।"
        : "Welcome to AI Trial. I can build looks, compare products, and explain why each piece fits your vibe, budget, and occasion. Start with a question or tap a starter prompt.",
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderProductLinkedText(
  text: string,
  productUrlByName: Map<string, string>,
  productNameRegex: RegExp | null,
  keyPrefix: string,
) {
  if (!text) {
    return null;
  }

  if (!productNameRegex) {
    return text;
  }

  const parts = text.split(productNameRegex);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    const productUrl = productUrlByName.get(part);

    if (!productUrl) {
      return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
    }

    return (
      <a
        key={`${keyPrefix}-product-${index}`}
        href={productUrl}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-cyan-700 underline decoration-cyan-500/60 underline-offset-2 hover:text-cyan-800"
      >
        {part}
      </a>
    );
  });
}

function renderInlineMarkdown(
  text: string,
  productUrlByName: Map<string, string>,
  productNameRegex: RegExp | null,
  keyPrefix: string,
) {
  const boldPattern = /(\*\*[^*]+\*\*)/g;
  const chunks = text.split(boldPattern);

  return chunks.map((chunk, index) => {
    if (!chunk) {
      return null;
    }

    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      const boldText = chunk.slice(2, -2);

      return (
        <strong key={`${keyPrefix}-bold-${index}`} className="font-semibold text-slate-900">
          {renderProductLinkedText(
            boldText,
            productUrlByName,
            productNameRegex,
            `${keyPrefix}-bold-inner-${index}`,
          )}
        </strong>
      );
    }

    return (
      <span key={`${keyPrefix}-plain-${index}`}>
        {renderProductLinkedText(
          chunk,
          productUrlByName,
          productNameRegex,
          `${keyPrefix}-plain-inner-${index}`,
        )}
      </span>
    );
  });
}

function renderMessageContent(
  content: string,
  productUrlByName: Map<string, string>,
  productNameRegex: RegExp | null,
  keyPrefix: string,
): ReactNode {
  const normalized = content.replace(/\r\n/g, "\n").trim();

  if (!normalized) {
    return null;
  }

  const blocks = normalized.split(/\n{2,}/).map((block) => block.trim());

  return blocks.map((block, blockIndex) => {
    const lines = block.split("\n").map((line) => line.trim());
    const isBulletList = lines.every((line) => /^[-*]\s+/.test(line));
    const isSingleBoldHeading =
      lines.length === 1 && /^\*\*.+\*\*$/.test(lines[0]);

    if (isSingleBoldHeading) {
      return (
        <h4
          key={`${keyPrefix}-heading-${blockIndex}`}
          className="text-sm font-semibold text-slate-900 sm:text-[0.95rem]"
        >
          {renderInlineMarkdown(
            lines[0].slice(2, -2),
            productUrlByName,
            productNameRegex,
            `${keyPrefix}-heading-inline-${blockIndex}`,
          )}
        </h4>
      );
    }

    if (isBulletList) {
      return (
        <ul
          key={`${keyPrefix}-list-${blockIndex}`}
          className="ml-4 list-disc space-y-1 text-slate-700"
        >
          {lines.map((line, lineIndex) => (
            <li key={`${keyPrefix}-item-${blockIndex}-${lineIndex}`}>
              {renderInlineMarkdown(
                line.replace(/^[-*]\s+/, ""),
                productUrlByName,
                productNameRegex,
                `${keyPrefix}-item-inline-${blockIndex}-${lineIndex}`,
              )}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`${keyPrefix}-paragraph-${blockIndex}`} className="text-slate-700">
        {lines.map((line, lineIndex) => (
          <span key={`${keyPrefix}-line-${blockIndex}-${lineIndex}`}>
            {renderInlineMarkdown(
              line,
              productUrlByName,
              productNameRegex,
              `${keyPrefix}-line-inline-${blockIndex}-${lineIndex}`,
            )}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

export default function AiTrialPage() {
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<UiLanguage>("bn");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    getWelcomeMessage("bn"),
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);

  const fallbackCatalog = useMemo(() => {
    const map = new Map<string, Product>();

    [...fallbackProducts, ...newArrivalProducts].forEach((product) => {
      map.set(product.id, product);
    });

    return Array.from(map.values());
  }, []);

  const allProducts = catalogProducts.length > 0 ? catalogProducts : fallbackCatalog;

  const productUrlByName = useMemo(() => {
    const map = new Map<string, string>();

    allProducts.forEach((product) => {
      if (!map.has(product.name)) {
        map.set(product.name, `/products/${product.id}`);
      }
    });

    return map;
  }, [allProducts]);

  const productNameRegex = useMemo(() => {
    const names = Array.from(productUrlByName.keys())
      .sort((left, right) => right.length - left.length)
      .map(escapeRegex);

    if (names.length === 0) {
      return null;
    }

    return new RegExp(`(${names.join("|")})`, "g");
  }, [productUrlByName]);

  const selectedProductIds = useMemo(
    () =>
      allProducts
        .filter((product) => product.inStock)
        .slice(0, 10)
        .map((product) => product.id),
    [allProducts],
  );

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        const payload = (await response.json()) as { products?: Product[]; error?: string };

        if (!response.ok) {
          throw new Error(payload.error || "Failed to load product catalog.");
        }

        setCatalogProducts(payload.products || []);
      } catch {
        // Fall back to static catalog when the API endpoint is unavailable.
      }
    };

    void loadCatalog();
  }, []);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const resetConversation = () => {
    setMessages([getWelcomeMessage(language)]);
    setInput("");
    setError(null);
  };

  const sendMessage = async (preset?: string) => {
    const text = (preset ?? input).trim();

    if (!text || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/ai-trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages
            .slice(-12)
            .map(({ role, content }) => ({ role, content })),
          selectedProductIds,
          language,
          profile: PROFILE_DEFAULTS,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Unable to reach AI Trial service.");
      }

      const assistantReply = payload.reply?.trim();

      if (!assistantReply) {
        throw new Error("AI Trial returned an empty reply.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unexpected error while contacting AI Trial.";

      setError(message);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content:
            language === "bn"
              ? "এই মুহূর্তে অনুরোধটি সম্পন্ন করা যায়নি। Gemini env settings যাচাই করে আবার চেষ্টা করুন।"
              : "I could not complete that request right now. Check your Gemini env settings and try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const isBangla = language === "bn";
  const lookSuggestions = LOOK_SUGGESTIONS[language];
  const taskSuggestions = TASK_SUGGESTIONS[language];
  const lookSectionTitle = isBangla
    ? "AI পরামর্শ: লুক আইডিয়া"
    : "AI Suggestions: Look Ideas";
  const taskSectionTitle = isBangla
    ? "AI পরামর্শ: শপিং টাস্ক"
    : "AI Suggestions: Shopping Tasks";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} relative h-full overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_90%_4%,rgba(251,191,36,0.2),transparent_30%),linear-gradient(160deg,#f8fbff_0%,#eef6ff_45%,#fdfaf3_100%)] text-slate-900`}
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-44 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
        <div className="flex h-full min-h-0 flex-1 flex-col rounded-3xl border border-slate-200/80 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3">
            <div className="min-w-0">
              <div className="mb-1 inline-flex items-center gap-1 rounded-full border border-cyan-300/70 bg-cyan-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-800">
                <Sparkles className="h-3 w-3" />
                Gemini Co-Pilot
              </div>
              <h1 className="truncate text-lg leading-tight text-slate-900 sm:text-2xl [font-family:var(--font-display)]">
                AI Trial Conversation Studio
              </h1>
            </div>
            <button
              type="button"
              onClick={resetConversation}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] text-slate-700 transition hover:border-slate-500 hover:text-slate-900 sm:px-3 sm:text-xs"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              {isBangla ? "রিসেট" : "Reset"}
            </button>
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-2 p-2 sm:gap-3 sm:p-3 lg:flex-row">
            <section className="flex min-h-0 flex-[1.35] flex-col rounded-2xl border border-slate-200 bg-white/80 lg:flex-1">
              <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-3 py-2 text-xs text-slate-600 sm:text-sm">
                <MessageCircle className="h-4 w-4 text-cyan-600" />
                {isBangla ? "কনভারসেশনাল চ্যাট" : "Conversational chat"}
              </div>

              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[92%] rounded-2xl border px-3 py-2 text-xs leading-relaxed sm:max-w-[84%] sm:text-sm ${
                        message.role === "user"
                          ? "border-cyan-200 bg-cyan-50 text-cyan-900"
                          : "border-slate-200 bg-white text-slate-800"
                      }`}
                    >
                      <div className="mb-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-slate-500">
                        {message.role === "user" ? (
                          <>
                            <User className="h-3 w-3" /> {isBangla ? "আপনি" : "You"}
                          </>
                        ) : (
                          <>
                            <Bot className="h-3 w-3" /> AI Trial
                          </>
                        )}
                      </div>
                      <div className="space-y-2 whitespace-normal">
                        {renderMessageContent(
                          message.content,
                          productUrlByName,
                          productNameRegex,
                          message.id,
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 sm:text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isBangla
                        ? "আপনার রিকমেন্ডেশন প্রস্তুত করা হচ্ছে..."
                        : "Building your recommendation..."}
                    </div>
                  </div>
                )}

                <div ref={scrollAnchorRef} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="shrink-0 border-t border-slate-200 p-2.5 sm:p-3"
              >
                <label htmlFor="ai-trial-input" className="sr-only">
                  {isBangla ? "AI Trial-কে জিজ্ঞাসা করুন" : "Ask AI Trial"}
                </label>
                <div className="flex items-end gap-2">
                  <textarea
                    id="ai-trial-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={
                      isBangla
                        ? "লুক, তুলনা, বা বিকল্প নিয়ে প্রশ্ন করুন..."
                        : "Ask for a look, comparison, or substitutions..."
                    }
                    rows={2}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    className="min-h-[52px] flex-1 resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-cyan-400/30 transition placeholder:text-slate-400 focus:ring-2 sm:min-h-[66px] sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSending || !input.trim()}
                    className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 text-xs font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:px-4 sm:text-sm"
                  >
                    <Send className="h-4 w-4" />
                    {isBangla ? "পাঠান" : "Send"}
                  </button>
                </div>

                {error && <p className="mt-2 text-[11px] text-rose-600">{error}</p>}
              </form>
            </section>

            <aside className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white/90 lg:w-[43%] lg:min-w-[12rem] lg:max-w-[22rem] lg:flex-none">
              <div className="shrink-0 border-b border-slate-200 p-2.5 sm:p-3">
                <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-700 sm:text-xs">
                  {isBangla ? "ভাষা নির্বাচন" : "Language"}
                </h2>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage("bn")}
                    className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition sm:text-xs ${
                      isBangla
                        ? "border-cyan-500 bg-cyan-100 text-cyan-800"
                        : "border-slate-300 bg-white text-slate-700 hover:border-cyan-300"
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition sm:text-xs ${
                      !isBangla
                        ? "border-cyan-500 bg-cyan-100 text-cyan-800"
                        : "border-slate-300 bg-white text-slate-700 hover:border-cyan-300"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-2.5 sm:p-3">
                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-700 sm:text-[11px]">
                    {lookSectionTitle}
                  </h3>
                  <div className="space-y-1.5">
                    {lookSuggestions.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        disabled={isSending}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-left text-[10px] leading-snug text-slate-700 transition hover:border-cyan-400 hover:text-cyan-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-700 sm:text-[11px]">
                    {taskSectionTitle}
                  </h3>
                  <div className="space-y-1.5">
                    {taskSuggestions.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        disabled={isSending}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-left text-[10px] leading-snug text-slate-700 transition hover:border-amber-400 hover:text-amber-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}