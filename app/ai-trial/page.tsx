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

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

const STYLE_DIRECTIONS = [
  "Minimal Smart",
  "Street Utility",
  "Classic Tailored",
  "Athleisure Blend",
];

const OCCASIONS = [
  "Daily wear",
  "Office day",
  "Date night",
  "Weekend trip",
  "Smart casual event",
];

const BUDGETS = ["Under $100", "$100 - $250", "$250 - $500", "$500+"];

const LOOK_SUGGESTIONS = [
  "Build me a 3-piece look for an office day under $250.",
  "I want a monochrome weekend outfit that still feels premium.",
  "Suggest one watch and one sneaker pairing for date night.",
  "I need a capsule starter kit from your current catalog.",
  "Create a travel outfit with one shirt, one pant, and one sneaker.",
  "Make me a relaxed streetwear look with a clean watch accent.",
  "Give me two color-safe outfit ideas for evening events.",
  "Recommend a smart-casual combo that works from day to night.",
];

const TASK_SUGGESTIONS = [
  "Compare two sneakers and tell me which is better for all-day comfort.",
  "Find the best value pieces under $100 from my selected products.",
  "Suggest substitutions if my top pick is out of stock.",
  "Plan a 5-item capsule wardrobe with minimal overlap.",
  "Prioritize products by versatility and cost-per-wear.",
  "Give me one safe pick and one bold pick for the same occasion.",
  "Build a beginner wardrobe starting with just $300.",
  "Show me an upgrade path from budget to premium options.",
];

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getWelcomeMessage(): ChatMessage {
  return {
    id: createId(),
    role: "assistant",
    content:
      "Welcome to AI Trial. I can build looks, compare products, and explain why each piece fits your vibe, budget, and occasion. Start with a question or tap a starter prompt.",
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
        className="font-semibold text-cyan-200 underline decoration-cyan-400/70 underline-offset-2 hover:text-cyan-100"
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
        <strong key={`${keyPrefix}-bold-${index}`} className="font-semibold text-slate-50">
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
          className="text-sm font-semibold text-slate-50 sm:text-[0.95rem]"
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
          className="ml-4 list-disc space-y-1 text-slate-200"
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
      <p key={`${keyPrefix}-paragraph-${blockIndex}`} className="text-slate-200">
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
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    getWelcomeMessage(),
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [styleDirection, setStyleDirection] = useState(STYLE_DIRECTIONS[0]);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [notes, setNotes] = useState("");
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [catalogError, setCatalogError] = useState<string | null>(null);

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

  const spotlightProducts = useMemo<Product[]>(
    () => allProducts.filter((product) => product.inStock),
    [allProducts],
  );

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectedProductIds.length === 0 && spotlightProducts.length > 0) {
      setSelectedProductIds(spotlightProducts.slice(0, 6).map((product) => product.id));
    }
  }, [selectedProductIds.length, spotlightProducts]);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        const payload = (await response.json()) as { products?: Product[]; error?: string };

        if (!response.ok) {
          throw new Error(payload.error || "Failed to load product catalog.");
        }

        setCatalogProducts(payload.products || []);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to load product catalog.";
        setCatalogError(message);
      }
    };

    void loadCatalog();
  }, []);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }

      return [...current, productId];
    });
  };

  const resetConversation = () => {
    setMessages([getWelcomeMessage()]);
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
          profile: {
            styleDirection,
            occasion,
            budget,
            notes,
          },
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
            "I could not complete that request right now. Check your Gemini env settings and try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} relative h-full overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(56,189,248,0.14),transparent_36%),radial-gradient(circle_at_90%_4%,rgba(251,146,60,0.15),transparent_32%),linear-gradient(160deg,#040b18_0%,#0b1628_45%,#121f33_100%)] text-slate-100`}
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-44 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">
        <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-white/10 bg-slate-950/70 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl">
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3">
            <div className="min-w-0">
              <div className="mb-1 inline-flex items-center gap-1 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-100">
                <Sparkles className="h-3 w-3" />
                Gemini Co-Pilot
              </div>
              <h1 className="truncate text-lg leading-tight text-slate-100 sm:text-2xl [font-family:var(--font-display)]">
                AI Trial Conversation Studio
              </h1>
            </div>
            <button
              type="button"
              onClick={resetConversation}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-600 px-2.5 py-1 text-[11px] text-slate-300 transition hover:border-slate-400 hover:text-slate-100 sm:px-3 sm:text-xs"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </header>

          <div className="flex min-h-0 flex-1 gap-2 p-2 sm:gap-3 sm:p-3">
            <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-slate-950/70">
              <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-3 py-2 text-xs text-slate-300 sm:text-sm">
                <MessageCircle className="h-4 w-4 text-cyan-200" />
                Conversational chat
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
                          ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-50"
                          : "border-slate-700 bg-slate-900/90 text-slate-200"
                      }`}
                    >
                      <div className="mb-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">
                        {message.role === "user" ? (
                          <>
                            <User className="h-3 w-3" /> You
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
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 sm:text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Building your recommendation...
                    </div>
                  </div>
                )}

                <div ref={scrollAnchorRef} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="shrink-0 border-t border-white/10 p-2.5 sm:p-3"
              >
                <label htmlFor="ai-trial-input" className="sr-only">
                  Ask AI Trial
                </label>
                <div className="flex items-end gap-2">
                  <textarea
                    id="ai-trial-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask for a look, comparison, or substitutions..."
                    rows={2}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage();
                      }
                    }}
                    className="min-h-[66px] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-slate-100 outline-none ring-cyan-300/30 transition placeholder:text-slate-500 focus:ring-2 sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSending || !input.trim()}
                    className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-3 text-xs font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:px-4 sm:text-sm"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </div>

                {error && <p className="mt-2 text-[11px] text-rose-300">{error}</p>}
              </form>
            </section>

            <aside className="flex min-h-0 w-[43%] min-w-[9.5rem] max-w-[18rem] flex-col rounded-2xl border border-white/10 bg-slate-900/70 sm:min-w-[12rem] sm:max-w-[20rem] lg:max-w-[22rem]">
              <div className="shrink-0 border-b border-white/10 p-2.5 sm:p-3">
                <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100 sm:text-xs">
                  Right-side Controls
                </h2>

                <div className="space-y-2">
                  <label className="flex flex-col gap-1 text-[10px] text-slate-300 sm:text-[11px]">
                    Style direction
                    <select
                      value={styleDirection}
                      onChange={(event) => setStyleDirection(event.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 outline-none ring-cyan-300/30 transition focus:ring-2 sm:text-xs"
                    >
                      {STYLE_DIRECTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1 text-[10px] text-slate-300 sm:text-[11px]">
                    Occasion
                    <select
                      value={occasion}
                      onChange={(event) => setOccasion(event.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 outline-none ring-cyan-300/30 transition focus:ring-2 sm:text-xs"
                    >
                      {OCCASIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1 text-[10px] text-slate-300 sm:text-[11px]">
                    Budget
                    <select
                      value={budget}
                      onChange={(event) => setBudget(event.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 outline-none ring-cyan-300/30 transition focus:ring-2 sm:text-xs"
                    >
                      {BUDGETS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1 text-[10px] text-slate-300 sm:text-[11px]">
                    Notes
                    <input
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Fit or color notes"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 outline-none ring-cyan-300/30 transition placeholder:text-slate-500 focus:ring-2 sm:text-xs"
                    />
                  </label>
                </div>
              </div>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-2.5 sm:p-3">
                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-200 sm:text-[11px]">
                    AI Suggestions: Look Ideas
                  </h3>
                  <div className="space-y-1.5">
                    {LOOK_SUGGESTIONS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        disabled={isSending}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 py-1.5 text-left text-[10px] leading-snug text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-200 sm:text-[11px]">
                    AI Suggestions: Shopping Tasks
                  </h3>
                  <div className="space-y-1.5">
                    {TASK_SUGGESTIONS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        disabled={isSending}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 py-1.5 text-left text-[10px] leading-snug text-slate-300 transition hover:border-amber-300/60 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-100 sm:text-[11px]">
                      Product URL Index
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      {selectedProductIds.length}/{spotlightProducts.length}
                    </span>
                  </div>

                  {catalogError && (
                    <p className="mb-2 text-[10px] text-amber-200">{catalogError}</p>
                  )}

                  <div className="space-y-1.5">
                    {spotlightProducts.map((product) => {
                      const isSelected = selectedProductIds.includes(product.id);
                      const productUrl = `/products/${product.id}`;

                      return (
                        <div
                          key={product.id}
                          className="rounded-lg border border-slate-700/60 bg-slate-900/70 p-1.5"
                        >
                          <button
                            type="button"
                            onClick={() => toggleProduct(product.id)}
                            className={`w-full rounded-md border px-1.5 py-1 text-left transition ${
                              isSelected
                                ? "border-emerald-300/70 bg-emerald-300/15"
                                : "border-transparent bg-slate-900 hover:border-slate-600"
                            }`}
                          >
                            <p className="truncate text-[10px] font-semibold text-slate-100 sm:text-[11px]">
                              {product.name}
                            </p>
                            <p className="truncate text-[10px] text-slate-400">
                              ${product.price.toFixed(2)} • {product.category}
                            </p>
                          </button>
                          <a
                            href={productUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-flex text-[10px] text-cyan-200 underline decoration-cyan-400/70 underline-offset-2 hover:text-cyan-100"
                          >
                            {productUrl}
                          </a>
                        </div>
                      );
                    })}
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