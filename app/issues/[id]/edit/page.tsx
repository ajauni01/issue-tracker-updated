import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

// dynamic import the IssueForm component to provide a better user experience and show the loading skeleton
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
}); // TODO: understand how this works
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
