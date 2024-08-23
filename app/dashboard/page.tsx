"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TodoList from "../../components/TodoList";

export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!token || !storedUserId) {
      router.push("/");
      return;
    }

    setUserId(storedUserId);
  }, [router]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <TodoList userId={userId} />
    </div>
  );
}
