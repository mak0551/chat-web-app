"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form, {
        withCredentials: true,
      });
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-4 py-6">
          <h2 className="text-xl font-semibold text-center">Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Input
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="text"
          />
          <Button className="w-full" onClick={handleSubmit}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
