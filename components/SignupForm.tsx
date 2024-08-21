"use client";

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // TODO: Implement signup logic
    // If signup successful, redirect to login page
    router.push("/");
  };

  return (
    <form onSubmit={handleSignup}>
      <TextField
        label="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
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
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
}
