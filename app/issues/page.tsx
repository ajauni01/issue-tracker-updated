import { Table } from '@radix-ui/themes';
import {IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import delay from 'delay';
import IssueActions from './IssueActions';
  
const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  // silulate a delay of 2 seconds to show the loading skeleton
  await delay(2000);
  
  return (
    <div>
      {/* new issue button */}
      <IssueActions/>
      {/* table to show all the issues */}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        {/* table body */}
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {/* show to details of the issue upon clicking on the title */}
             <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status}/>
                  </div>
              </Table.Cell>
              <Table.Cell className='md:table-cell'>
              <IssueStatusBadge status={issue.status}/>
                </Table.Cell>
              <Table.Cell className='md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
// TODO: Investgate why the md:table-cell class is not working after adding the 'hidden' class to the div
// TODO: understand the const issues = await prisma.issue.findMany();