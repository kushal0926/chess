import ChessBoard from "@/_components/layout/ChessBoard";
import ChessInput from "@/_components/layout/ChessInput";
import Logo from "@/_components/layout/Logo";

export default function Home() {
  return (
    <section className="home">
      {/* logo... */}
      <Logo />
      {/* inputs and boards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* left side for input */}
        <div className="flex flex-col gap-5">
          <ChessInput />
        </div>
        {/* right side for board */}
        <div>
          <ChessBoard />
        </div>
      </div>
    </section>
  );
}
