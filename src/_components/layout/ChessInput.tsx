"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function ChessInput() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFetchData() {
    if (!username.trim()) return;
    setLoading(true);
    setError("");

    // todo:fetching data in future here
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
    </div>
  );
}
