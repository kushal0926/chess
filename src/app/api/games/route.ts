import { NextRequest, NextResponse } from "next/server";

const CHESSCOM_API = "https://api.chess.com/pub";
const FREE_LIMIT = 4;
// const AUTH_LIMIT = 10

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const userName = searchParams.get("username");
  if (!userName) {
    return NextResponse.json(
      { error: "username is required" },
      { status: 400 },
    );
  }

  // fetching the recent games
  const archive = await fetch(
    `${CHESSCOM_API}/player/${userName}/games/archives`,
    {
      headers: {
        "User-Agent": "chess-analysis-app/1.0",
      },
    },
  );

  if (!archive.ok) {
    return NextResponse.json({ error: "player not found" }, { status: 404 });
  }

  const archiveData = await archive.json();
  const archives: string[] = archiveData.archives;

  if (!archives.length) {
    return NextResponse.json({ error: "no games found" }, { status: 404 });
  }

  // getting the most recent played games
  const latestArchive = archives[archives.length - 1];

  if (!latestArchive) {
    return NextResponse.json(
      { error: "no recent games found" },
      { status: 404 },
    );
  }

  const gamesRes = await fetch(latestArchive, {
    headers: {
      "User-Agent": "chess-analysis-app/1.0",
    },
  });
  const gamesData = await gamesRes.json();

  const games = gamesData.games.reverse().slice(0, FREE_LIMIT);

  return NextResponse.json({ games });
}
