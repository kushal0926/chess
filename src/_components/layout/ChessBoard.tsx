"use client";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";
import type { PieceDropHandlerArgs } from "react-chessboard";

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess());

  function onDrop({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs): boolean {
    if (!targetSquare) return false;
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    setGame(new Chess(game.fen()));
    return true;
  }

  return (
    <section className="chessboard w-125 mt-5">
      <Chessboard
        options={{
          position: game.fen(),
          onPieceDrop: onDrop,
          darkSquareStyle: { backgroundColor: "#0d3b66" },
          lightSquareStyle: { backgroundColor: "#faf0ca" },
        }}
      />
    </section>
  );
}
