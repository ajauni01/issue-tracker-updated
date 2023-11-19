import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./list/IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

// annotate the searchParams prop with the type of the searchParams object which has a stuatus property of type Status from prisma/client
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // get all the statuses from the Prisma client Status enum
  const statuses = Object.values(Status);
  // if the searchParams.status is not in the statuses array, set the status to undefined
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  // if the searchParams.orderBy is not in the columns array, set the orderBy to undefined so that the system does not crash
  // validate the column name by mapping the array of columns and checking if the column.value is included in the searchParams.orderBy to avoid system crash
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  //  get the page number from the searchParams.page and convert it to a number
  let page = parseInt(searchParams.page);
  if (isNaN(page)) {
    // Handle the error
    page = 1;
  }
  const pageSize = 10;
  const where = { status };

  //  fetch issues from the database based on the status or searchParams.status
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  // count the number of issues based on the status or searchParams.status
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      {/* new issue button */}
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuesPage;
// TODO: Investgate why the md:table-cell class is not working after adding the 'hidden' class to the div
// TODO: understand the const issues = await prisma.issue.findMany();

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

