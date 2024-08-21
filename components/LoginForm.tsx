"use client";

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { authenticate, generateToken } from "../lib/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await authenticate(username, password);
    if (user) {
      const token = await generateToken(user.id);
      // 토큰을 로컬 스토리지나 쿠키에 저장
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      // 로그인 실패 처리
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Button onClick={() => router.push("/signup")} variant="text">
        Sign Up
      </Button>
    </form>
  );
}
