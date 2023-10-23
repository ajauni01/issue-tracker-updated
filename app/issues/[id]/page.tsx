import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
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
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3 my-2'>
              <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card><p>{issue.description}</p></Card>
        </div>
    
  )
}

export default IssueDetailPage;
// TODO: understand the interface Props
