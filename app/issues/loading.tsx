import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import delay from 'delay';

export const LoadingIssuePage = () => {
const issues = [1,2,3,4,5,6];

  return (
   <div>
    <IssueActions/>
     <Table.Root variant="surface">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell >Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell >Created</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    {/* table body */}
    <Table.Body>
      {issues.map(issue => (
        <Table.Row key={issue}>
          <Table.Cell>
            <Skeleton/>
            <div className='block md:hidden'><Skeleton/></div>
          </Table.Cell>
          <Table.Cell >
          <Skeleton/>
            </Table.Cell>
          <Table.Cell ><Skeleton/></Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
   </div>
  )
}
export default LoadingIssuePage;
