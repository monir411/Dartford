import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Admin content endpoint placeholder.",
  });
}

export async function PATCH() {
  return NextResponse.json(
    {
      ok: false,
      error: "Admin content updates are not implemented yet.",
    },
    { status: 501 },
  );
}
