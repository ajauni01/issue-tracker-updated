import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./list/IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      {/* show the issue filter button to filter issues among 'ALL', 'OPEN', 'IN_PROGRESS', and 'CLOSED' */}
      <IssueStatusFilter />
      {/* show the new issue button to create a new issue */}
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
