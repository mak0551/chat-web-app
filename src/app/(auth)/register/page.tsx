"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form, {
        withCredentials: true,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-4 py-6">
          <h2 className="text-xl font-semibold text-center">Register</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Input
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
          />
          <Button className="w-full" onClick={handleSubmit}>
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
