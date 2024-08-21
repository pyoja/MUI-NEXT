"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "../../lib/auth";
import TodoList from "../../components/TodoList";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const payload = verifyToken(token);
    if (!payload) {
      router.push("/");
    }
  }, [router]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    return null; // or a loading indicator
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <TodoList userId={payload.id} />
    </div>
  );
}
