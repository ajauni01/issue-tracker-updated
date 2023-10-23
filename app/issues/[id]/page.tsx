import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: {id: string}
}

const IssueDetailPage = async ({params}: Props) => {
// redirect the user to the not found page if the parsed id is not a number
const parsedId = parseInt(params.id);
  if (isNaN(parsedId)) {
    notFound();
  }

  // get the issue from the database
    const issue = await prisma.issue.findUnique({
        where:{
          id: parsedId
        }
      })
      if(!issue){
        notFound();
      }
  
    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    
  )
}

export default IssueDetailPage;
// TODO: understand the interface Props
