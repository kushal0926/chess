import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <section className="logo">
      <Link href="/">
        <Image
          src="/chess_logo.png"
          alt="logo for the chess analysis"
          width={40}
          height={50}
          className="cursor-pointer"
        />
      </Link>
    </section>
  );
}
