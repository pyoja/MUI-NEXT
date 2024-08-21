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
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <TodoList userId={userId} />
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { verifyToken } from "../../lib/auth";
// import TodoList from "../../components/TodoList";

// export default function Dashboard() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/");
//       return;
//     }

//     const payload = verifyToken(token);
//     if (!payload) {
//       router.push("/");
//     }
//   }, [router]);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const payload = token ? verifyToken(token) : null;

//   if (!payload) {
//     return null; // or a loading indicator
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <TodoList userId={payload.id} />
//     </div>
//   );
// }
