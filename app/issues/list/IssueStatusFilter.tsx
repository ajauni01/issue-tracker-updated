"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

// statuses is an array of objects that contains the label and value of the select options
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueStatusFilter = () => {
  //   useRouter is a hook that returns the router object
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        //  if the status is 'ALL', remove the query parameter
        const query = status !== "ALL" ? `?status=${status}` : "";
        // redirect to the issues page with the query parameter
        router.push(`/issues/${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value || "ALL"}
            value={status.value || "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
