import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // get the response from the request
  const body = await request.json();
  //  store the object returned by zod in the validation variable
  const validation = issueSchema.safeParse(body);
  // send a 400 response if the validation fails
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
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
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

// TODO: thoroughly investigate the reason behind using format() method here (validation.error.format())

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
