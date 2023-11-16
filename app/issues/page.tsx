import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon } from "@radix-ui/react-icons";

// annotate the searchParams prop with the type of the searchParams object which has a stuatus property of type Status from prisma/client
interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}
// filter the issues based on the column value
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  // get all the statuses from the Prisma client Status enum
  const statuses = Object.values(Status);
  // if the searchParams.status is not in the statuses array, set the status to undefined
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  // if the searchParams.orderBy is not in the columns array, set the orderBy to undefined so that the system does not crash
  // validate the column name by mapping the array of columns and checking if the column.value is included in the searchParams.orderBy to avoid system crash
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  //  fetch issues from the database based on the status or searchParams.status
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });
  return (
    <div>
      {/* new issue button */}
      <IssueActions />
      {/* table to show all the issues */}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
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
        {/* table body */}
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
    </div>
  );
};

export default IssuesPage;
// TODO: Investgate why the md:table-cell class is not working after adding the 'hidden' class to the div
// TODO: understand the const issues = await prisma.issue.findMany();
