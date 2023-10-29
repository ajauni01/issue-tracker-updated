import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest){
 const body = await request.json();
//  store the object returned by zod in the validation variable
 const validation = issueSchema.safeParse(body);
 if (!validation.success){
    return NextResponse.json(validation.error.format(), {status:400})
 }

//  if the validation is successful, create a new issue using the prisma client
 const newIssue = await prisma.issue.create({
    data: {title: body.title, description: body.description}
 });

 return NextResponse.json(newIssue, {status: 201})
}

// TODO: understand the issueSchema
// TODO: understand the Next.js prisma client
 