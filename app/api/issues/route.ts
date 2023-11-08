import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  // get the current session to authenticate the user
  const session = await getServerSession(authOptions);
  //  if the user is not authenticated, return a not found page
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  //  store the object returned by zod in the validation variable
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  //  if the validation is successful, create a new issue using the prisma client
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

// TODO: understand the issueSchema
// TODO: understand the Next.js prisma client
