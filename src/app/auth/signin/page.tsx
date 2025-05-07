"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [email, setEmail] = useState<string>("youremail@example.com");
  // const [password, setPassword] = useState<string>("Password123");

  const { login, authState } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (authState.isAuthenticated) router.push("/");
  }, [authState]);

  return (
    <div className="flex items-center w-full h-[100vh]">
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {authState.error && (
            <p className="text-red-500 text-sm">{authState.error}</p>
          )}
          <Button type="submit" className="w-full cursor-pointer">
            Sign In
          </Button>
        </form>

        <a href="/auth/signup" className="cursor-pointer underline mt-[10px]">
          Sign up
        </a>
      </div>
    </div>
  );
}
