import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get all users sorted by name
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  //   send the users as JSON to the client
  return NextResponse.json(users);
}
