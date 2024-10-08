import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

// dynamic import the IssueForm component to provide a better user experience and show the loading skeleton
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
}); 
interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // fetch the issue data from the database
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  // return a 404 page if the issue is not found
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;


