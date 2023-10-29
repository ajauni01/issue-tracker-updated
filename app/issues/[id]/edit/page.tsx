import prisma from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // fetch the issue data from the database
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  // return a 404 page if the issue is not found
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

// TODO: understand how the dot notation works to extract the id from the params object
