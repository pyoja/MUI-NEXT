import { NextResponse } from "next/server";
import { authenticate, generateToken } from "../../../lib/auth";

export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    if (!id || !password) {
      return NextResponse.json(
        { error: "ID and password are required" },
        { status: 400 }
      );
    }

    const user = await authenticate(id, password);

    if (user) {
      const token = await generateToken(user.id);
      return NextResponse.json({ token, userId: user.id }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
