"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { RegisterPayload } from "@/types/auth-type";

export default function SignUpPage() {
  const [formData, setFormData] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
    passwordconf: "",
    image: "",
  });
  const { register, authState } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register(formData);
    if (res) router.push("/auth/signin");
  };

  return (
    <div className="flex items-center w-full h-[100vh]">
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
               autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="passwordconf">Confirm Password</Label>
            <Input
              name="passwordconf"
              type="password"
              value={formData.passwordconf}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          {authState.error && (
            <p className="text-red-500 text-sm">{authState.error}</p>
          )}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <a href="/auth/signin" className="cursor-pointer underline mt-[10px]">
          Sign in
        </a>
      </div>
    </div>
  );
}
