import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: {id: string}
}

const IssueDetailPage = async ({params}: Props) => {
// redirect the user to the not found page if the parsed id is not a number
const parsedId = parseInt(params.id);
  if (isNaN(parsedId)) {
    notFound();
  }

  // get the issue from the MySQL database
    const issue = await prisma.issue.findUnique({
        where:{
          id: parsedId
        }
      })
      // redirect the user to the not found page if the issue is not found
      if(!issue) notFound();
      // simulate a delay of 2 seconds to show the loading skeleton
      await delay(2000);

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3 my-2'>
              <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            {/* add the pros class to improve the quality of the text written on the markdown editor */}
            <Card className='prose mt-2'>
              <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    
  )
}

export default IssueDetailPage;
// TODO: understand the interface Props
