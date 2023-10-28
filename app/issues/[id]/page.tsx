import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // redirect the user to the not found page if the parsed id is not a number
  const parsedId = parseInt(params.id);
  if (isNaN(parsedId)) {
    notFound();
  }

  // get the issue from the MySQL database
  const issue = await prisma.issue.findUnique({
    where: {
      id: parsedId,
    },
  });
  // redirect the user to the not found page if the issue is not found
  if (!issue) notFound();
  // simulate a delay of 2 seconds to show the loading skeleton
  await delay(2000);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      {/* column1 & IssueDetals page */}
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {/* column2 & Edit button */}
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
// TODO: understand the interface Props
