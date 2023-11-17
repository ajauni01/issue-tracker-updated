import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon } from "@radix-ui/react-icons";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
// annotate the searchParams prop with the type of the searchParams object which has a stuatus property of type Status from prisma/client
interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              {/* Query object to pass the selected query in addition to the current filtering to the url */}
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {" "}
                {column.label}
                {/* show the arrow icon for the NextLink based on the currently selected column */}
                {column.value === searchParams.orderBy && (
                  <ArrowDownIcon className="inline" />
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              {/* show to details of the issue upon clicking on the title */}
              <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
export default IssueTable;

// filter the issues based on the column value
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "md:table-cell" },
  { label: "Created", value: "createdAt", className: "md:table-cell" },
];
export const columnNames = columns.map((column) => column.value);
