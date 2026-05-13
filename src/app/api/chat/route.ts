import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]!);

export async function POST(req: NextRequest) {
  const { messages, pgn } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are an expert chess coach. ${pgn ? `The current game PGN is: ${pgn}` : "No game is loaded yet."}
        Analyze positions, explain moves, suggest improvements, and help understand chess concepts.Keep responses concise and practical.`,
  });
  const chat = model.startChat({
    history: messages
      .slice(0, -1)
      .filter(
        (m: { role: string; content: string }) =>
          m.role === "user" || m.role === "assistant",
      )
      .filter((_: unknown, i: number) => i !== 0) // remove initial assistant greeting
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  const text = result.response.text();

  return NextResponse.json({ message: text });
}
