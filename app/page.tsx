"use client";

import React from "react";
import LoginForm from "../components/LoginForm";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "TODO LIST",
// };

export default function Home() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
