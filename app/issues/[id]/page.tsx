import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // get the session from the server
  const session = await getServerSession(authOptions);
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/* column1 & IssueDetals page */}
      {/* here md in Radix Ui is equivalent to lg in tailwind */}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {/* column2*/}
      {session && (
        <Box>
          <Flex direction="column" gap="2">
            <AssigneeSelect issue={issue} />
            {/* edit button */}
            <EditIssueButton issueId={issue.id} />
            {/* delete button */}
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
// TODO: understand the interface Props
// TODO: deep dive into the breakpoints in Radix UI and tailwnd
