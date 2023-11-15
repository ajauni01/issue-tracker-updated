import authOptions from "@/app/auth/authOptions";
import { pathchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // get the current session to authenticate the user
  const session = await getServerSession(authOptions);
  //  if the user is not authenticated, return a not found page
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  // get the response from the request
  const body = await request.json();
  //  store the object returned by zod in the validation variable
  const validation = pathchIssueSchema.safeParse(body);
  // send a 400 response if the validation fails
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  // destructure the assignedToUserId, title and description from the body
  const { assignedToUserId, title, description } = body;
  // if the assignedToUserId is present, find the user using the prisma client
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    // send an error response if the user is not found
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
  }

  //  if the validation is successful, find the issue using the prisma client
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //  send an error response if the issue is not found
  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }
  //  update the issue using the prisma client if the issue is found
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

// TODO: thoroughly investigate the reason behind using format() method here (validation.error.format())

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // get the current session to authenticate the user
  const session = await getServerSession(authOptions);
  //  if the user is not authenticated, return a not found page
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  // find the issue using the prisma client
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  // send an error response if the issue is not found
  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }
  // delete the issue using the prisma client if the issue is found
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({ message: "Issue deleted successfully" });
}
