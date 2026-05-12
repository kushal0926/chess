"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth/client";
import AuthModal from "@/_components/AuthModal";
import Logo from "./Logo";
import { Button } from "../ui/Button";
import { BotMessageSquare, LogOut, Play, User } from "lucide-react";

type Panel = "matches" | "ai" | "profile" | null;

type Props = {
  onPanelChange: (panel: Panel) => void;
  activePanel: Panel;
};

export default function Sidebar({ onPanelChange, activePanel }: Props) {
  const { data: session } = useSession();
  const [authModal, setAuthModal] = useState<"signin" | "signup" | null>(null);

  function handleAiClick() {
    if (!session) {
      setAuthModal("signin");
      return;
    }
    onPanelChange(activePanel === "ai" ? null : "ai");
  }

  function handleProfileClick() {
    if (!session) {
      setAuthModal("signin");
      return;
    }
    onPanelChange(activePanel === "profile" ? null : "profile");
  }

  const navItems = (
    <>
      <Button
        onClick={() =>
          onPanelChange(activePanel === "matches" ? null : "matches")
        }
        variant="ghost"
        title="Matches"
        className={`transition-transform duration-200 hover:scale-125 ${activePanel === "matches" ? "text-navy" : ""}`}
      >
        <Play />
      </Button>

      <Button
        onClick={handleAiClick}
        variant="ghost"
        className={`transition-transform duration-200 hover:scale-125 ${activePanel === "ai" ? "text-navy" : ""}`}
        title="AI Coach"
      >
        <BotMessageSquare />
      </Button>

      <Button
        onClick={handleProfileClick}
        variant="ghost"
        className={`transition-transform duration-200 hover:scale-125 ${activePanel === "profile" ? "text-navy" : ""}`}
        title="Profile"
      >
        <User />
      </Button>

      {session && (
        <Button
          variant="ghost"
          onClick={() => signOut().then(() => window.location.reload())}
          className="transition-transform duration-200 hover:scale-125"
          title="Sign out"
        >
          <LogOut />
        </Button>
      )}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen w-20 border-r border-cream/10 flex-col items-center py-6 gap-6 fixed left-0 top-0">
        <Logo />
        <div className="flex flex-col gap-4 mt-4">{navItems}</div>
      </aside>

      {/* Mobile bottom navbar */}
      <nav className=" lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-cream/10  flex items-center justify-evenly px-6 z-50 bg-background">
        <Play
          onClick={() =>
            onPanelChange(activePanel === "matches" ? null : "matches")
          }
          className={`w-6 h-6 cursor-pointer transition-transform duration-200 hover:scale-125 ${activePanel === "matches" ? "text-navy" : ""}`}
        />
        <BotMessageSquare
          onClick={handleAiClick}
          className={`w-6 h-6 cursor-pointer transition-transform duration-200 hover:scale-125 ${activePanel === "ai" ? "text-navy" : ""}`}
        />

        <Logo />

        <User
          onClick={handleProfileClick}
          className={`w-6 h-6 cursor-pointer transition-transform duration-200 hover:scale-125 ${activePanel === "profile" ? "text-navy" : ""}`}
        />
        {session && (
          <LogOut
            onClick={() => signOut().then(() => window.location.reload())}
            className="w-6 h-6 cursor-pointer transition-transform duration-200 hover:scale-125"
          />
        )}
      </nav>

      <AuthModal
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        defaultTab={authModal ?? "signin"}
      />
    </>
  );
}
