"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/client";
import { Button } from "@/_components/ui/Button";
import { Input } from "@/_components/ui/Input";
import Logo from "@/_components/layout/Logo";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn.email({
      email,
      password,
    });

    if (error) {
      setError(error.message ?? "something went wrong");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 flex flex-col gap-6">
        <Logo />
        <h1 className="text-2xl ">Welcome back</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Signning in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="underline tracking-wider font-bold hover:text-chiffon"
          >
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
}
