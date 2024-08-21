// app/api/todos/route.ts:
// todo 항목의 목록을 조회하거나 새로운 todo 항목을 생성하는 기능을 담당합니다.

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.tbl_user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const todos = await prisma.tbl_todo.findMany({
      where: {
        userNo: user.no,
      },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { text, userId } = await req.json();

  if (!text || !userId) {
    return NextResponse.json(
      { error: "Text and User ID are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.tbl_user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newTodo = await prisma.tbl_todo.create({
      data: {
        text,
        userNo: user.no,
      },
    });
    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, completed } = await req.json();

  if (typeof id !== "number") {
    return NextResponse.json(
      { error: "Todo ID is required and must be a number" },
      { status: 400 }
    );
  }

  if (typeof completed !== "boolean") {
    return NextResponse.json(
      { error: "Completed status is required and must be a boolean" },
      { status: 400 }
    );
  }

  try {
    const updatedTodo = await prisma.tbl_todo.update({
      where: { no: id },
      data: { completed },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (typeof id !== "number") {
    return NextResponse.json(
      { error: "Todo ID is required and must be a number" },
      { status: 400 }
    );
  }

  try {
    await prisma.tbl_todo.delete({
      where: { no: id },
    });
    return NextResponse.json({ message: "Todo deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
