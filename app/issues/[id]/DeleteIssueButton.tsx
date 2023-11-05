import { Button } from "@radix-ui/themes";

export const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
