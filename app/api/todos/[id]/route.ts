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

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { completed } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
  }

  try {
    const updatedTodo = await prisma.tbl_todo.update({
      where: { no: Number(id) },
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
  }

  try {
    await prisma.tbl_todo.delete({
      where: { no: Number(id) },
    });
    return NextResponse.json({ message: "Todo deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
