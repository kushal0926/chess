"use client";

import Logo from "@/_components/layout/Logo";
import { Button } from "@/_components/ui/Button";
import { Input } from "@/_components/ui/Input";
import { signUp } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setError(error.message ?? "something went wrong.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <section className="signup">
      <div className="w-full max-w-md p-8 flex flex-col gap-6">
        <Logo />
        <h1 className="text-2xl ">Create an account</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <Button
            type="submit"
            disabled={loading}
            className="disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a
            href="/signin"
            className="underline tracking-wider hover:text-chiffon font-bold"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
