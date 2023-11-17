import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const close = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <IssueSummary open={open} inProgress={inProgress} closed={3} />
    // <LatestIssues/>
  );
}

// TODO: investigate how does the searchParams object get the page number and pass it to the Pagination component
