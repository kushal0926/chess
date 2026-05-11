"use client";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState, useEffect, useCallback } from "react";
import type { PieceDropHandlerArgs } from "react-chessboard";
import type { ChessComGame } from "@/types";

type Props = {
  game: ChessComGame | null;
};

export default function ChessBoard({ game }: Props) {
  const [moves] = useState<string[]>(() => {
    if (!game) return [];
    const c = new Chess();
    c.loadPgn(game.pgn);
    return c.history();
  });

  const [freeGame, setFreeGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);

  const isReplayMode = game !== null;

  const goBack = useCallback(() => {
    setCurrentMove((prev) => Math.max(0, prev - 1));
  }, []);

  const goForward = useCallback(() => {
    setCurrentMove((prev) => Math.min(moves.length, prev + 1));
  }, [moves.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isReplayMode) return;
      if (e.key === "ArrowLeft" || e.key === "h") goBack();
      if (e.key === "ArrowRight" || e.key === "l") goForward();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goBack, goForward, isReplayMode]);

  function onDrop({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs): boolean {
    if (!targetSquare) return false;

    const move = freeGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    setFreeGame(new Chess(freeGame.fen()));
    return true;
  }

  const position = () => {
    if (!isReplayMode) return freeGame.fen();
    const c = new Chess();
    for (let i = 0; i < currentMove; i++) {
      c.move(moves[i]!);
    }
    return c.fen();
  };

  return (
    <section className="flex flex-col gap-4">
      <Chessboard
        options={{
          darkSquareStyle: { backgroundColor: "#0d3b66" },
          lightSquareStyle: { backgroundColor: "#faf0ca" },
          position: position(),
          allowDragging: !isReplayMode,
          ...(isReplayMode ? {} : { onPieceDrop: onDrop }),
        }}
      />
      {isReplayMode && (
        <p className="text-center text-sm text-gray-500">
          Move {currentMove} / {moves.length} · use ← → or h / l to navigate
        </p>
      )}
    </section>
  );
}
