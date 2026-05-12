"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth/client";
import Modal from "@/_components/ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "signup";
};

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = "signin",
}: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "signup">(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.ChangeEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (tab === "signup") {
      const { error } = await signUp.email({ name, email, password });
      if (error) {
        setError(error.message ?? "Something went wrong");
        setLoading(false);
        return;
      }
    } else {
      const { error } = await signIn.email({ email, password });
      if (error) {
        setError(error.message ?? "Something went wrong");
        setLoading(false);
        return;
      }
    }

    onClose();
    router.refresh();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6 ">
        <div className="flex gap-4 border-b border-cream/10">
          <Button variant="ghost" onClick={() => setTab("signin")}>
            Sign in
          </Button>
          <Button variant="ghost" onClick={() => setTab("signup")}>
            Sign up
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === "signup" && (
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              required
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />
          <Button type="submit" disabled={loading} variant="secondary">
            {loading
              ? "Please wait..."
              : tab === "signin"
                ? "Sign in"
                : "Sign up"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
