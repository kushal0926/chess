"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ChessComGame } from "@/types";

type Props = {
  onGameSelect: (game: ChessComGame) => void;
};

export default function ChessInput({ onGameSelect }: Props) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [games, setGames] = useState<ChessComGame[]>([]);

  async function handleFetchData() {
    if (!username.trim()) return;
    setLoading(true);
    setError("");

    // todo:fetching data in future here
    const response = await fetch(`/api/games?username=${username}`);
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    setGames(data.games);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2>Fetch your id form chess.com</h2>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="enter your chess username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button onClick={handleFetchData} disabled={loading}>
          {loading ? "Fetching..." : "Fetch"}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {games.length > 0 && (
        <div className="flex flex-col gap-2">
          {games.map((game, i) => (
            <div
              key={i}
              onClick={() => onGameSelect(game)}
              className="border border-cream/10 rounded p-3 hover:bg-[#262626] cursor-pointer text-cream"
            >
              <p className="font-bold">
                {game.white.username} vs {game.black.username}
              </p>
              <p className="text-sm text-gray-600">
                {game.white.rating} - {game.black.rating}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
