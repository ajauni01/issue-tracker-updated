import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "@/prisma/client";


//  use zod for data validation
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: NextRequest){
 const body = await request.json();
//  store the object returned by zod in the validation variable
 const validation = createIssueSchema.safeParse(body);
 if (!validation.success){
    return NextResponse.json(validation.error.errors, {status:400})
 }

//  if the validation is successful, create a new issue using the prisma client
 const newIssue = await prisma.issue.create({
    data: {title: body.title, description: body.description}
 });

 return NextResponse.json(newIssue, {status: 201})
}

// TODO: understand the createIssueSchema
// TODO: understand the Next.js prisma client
 