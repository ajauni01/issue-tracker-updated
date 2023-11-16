"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  //   useSearchParams is a hook that returns the searchParams object
  const searchParams = useSearchParams();

  return (
    <Select.Root
    // set the default value of the select to the status query parameter or "ALL"
    defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(status) => {
        //   create a new URLSearchParams object
        const params = new URLSearchParams();
        // append the status to the params object if the status is truthy
        if (status) params.append("status", status);
        // append the orderBy to the params object if the orderBy is truthy
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        // create a query string from the params object if the status is not "ALL" and the params object has a size
        const query = (status !== "ALL" && params.size) ? '?' + params.toString() : "";
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
