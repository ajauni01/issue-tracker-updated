import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
        <Grid columns={{initial: "1", md: "2"}} gap="5">
          {/* column1 */}
            <Box>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3 my-2'>
              <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            {/* add the pros class to improve the quality of the text written on the markdown editor */}
            <Card className='prose mt-2'>
              <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
            </Box>
            {/* column2 & Edit button */}
            <Box>
              <Button> 
                <Pencil2Icon/>
                <Link href={`/issues/${issue.id}/edit`}>Edit</Link>
                </Button>
            </Box>
        </Grid>
    
  )
}

export default IssueDetailPage;
// TODO: understand the interface Props
