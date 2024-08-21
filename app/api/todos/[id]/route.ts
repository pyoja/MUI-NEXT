import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
  }

  try {
    const todo = await prisma.tbl_todo.findUnique({
      where: { no: Number(id) },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function PUT(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   const { completed } = await req.json();

//   if (!id) {
//     return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
//   }

//   if (typeof completed !== "boolean") {
//     return NextResponse.json(
//       { error: "Completed status is required and must be a boolean" },
//       { status: 400 }
//     );
//   }

//   try {
//     const updatedTodo = await prisma.tbl_todo.update({
//       where: { no: parseInt(id) }, // id 값을 숫자로 변환
//       data: { completed },
//     });
//     return NextResponse.json(updatedTodo);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
//   }

//   try {
//     await prisma.tbl_todo.delete({
//       where: { no: parseInt(id) }, // id 값을 숫자로 변환
//     });
//     return NextResponse.json({ message: "Todo deleted" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
