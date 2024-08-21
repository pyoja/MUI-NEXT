import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userNo = searchParams.get("userNo");

  if (!userNo) {
    return NextResponse.json(
      { error: "User number is required" },
      { status: 400 }
    );
  }

  try {
    const todos = await prisma.tbl_todo.findMany({
      where: {
        userNo: Number(userNo),
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
