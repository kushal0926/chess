"use client";
import AiChat from "@/_components/layout/AIChat";
import ChessBoard from "@/_components/layout/ChessBoard";
import ChessInput from "@/_components/layout/ChessInput";
import Sidebar from "@/_components/layout/Sidebar";
import { ChessComGame } from "@/types";
import { useState } from "react";

type Panel = "matches" | "ai" | "profile" | null;

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<ChessComGame | null>(null);
  const [activePanel, setActivePanel] = useState<Panel>(null);

  return (
    <section className="flex min-h-screen">
      {/* desktop sidebar */}
      <Sidebar onPanelChange={setActivePanel} activePanel={activePanel} />

      {/* main content */}
      <div className="flex flex-1 flex-col lg:flex-row lg:ml-20 pb-16 lg:pb-0">
        {/* left - input */}
        <div className="flex flex-col gap-5 p-6 lg:w-80 lg:border-r border-cream/10">
          <ChessInput onGameSelect={setSelectedGame} />
        </div>

        {/* right - board centered */}
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-125">
            <ChessBoard key={selectedGame?.url} game={selectedGame} />
          </div>
        </div>

        {/* right - ai chat panel */}
        {activePanel === "ai" && (
          <div className="lg:w-80 border-l border-cream/10 flex flex-col">
            <AiChat game={selectedGame} />
          </div>
        )}
      </div>
    </section>
  );
}
