"use client";

import { useState, useRef, useEffect } from "react";
import { ChessComGame } from "@/types";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  game: ChessComGame | null;
};

export default function AiChat({ game }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: game
        ? "I can see your game! Ask me anything about it."
        : "Hi! I'm your chess coach. Load a game and I'll help you analyze it.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          pgn: game?.pgn ?? null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Something went wrong, try again." },
        ]);
        setLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      if (error instanceof Error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Something went wrong, try again." },
        ]);
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-semibold text-lg p-4 border-b border-cream/10">
        AI Coach
      </h2>

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
              m.role === "user"
                ? "self-end bg-black text-white"
                : "self-start bg-gray-100 text-black"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="self-start bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-400">
            Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="p-4 border-t border-cream/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask your coach..."
          className="flex-1 border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
