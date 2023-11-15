"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  //   return the loading skeleton if the data is still loading
  if (isLoading) return <Skeleton />;
  //   return null if there is still error after retrying 3 times
  if (error) return null;

  //  assignIssue is a function that is called when the value of the select changes and the api is called to update the issue
  const assignIssue = (userId: string) => {
    try {
      axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

  return (
    <>
      <Toaster />
      <Select.Root
        // the default value of the select
        defaultValue={issue.assignedToUserId || "unassigned"}
        // onValueChange is a function that is called when the value of the select changes and the api is called to update the issue
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* selecti option to unassign a user */}
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

// useUsers is a custom hook that is used to fetch the users to maintain clean code
const useUsers = () => {
  return useQuery<User[]>({
    // queryKey is a unique identifier for the query
    queryKey: ["users"],
    // queryFn is a function that returns the data
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    // staleTime is the time in milliseconds before the data is considered stale // we are using it for caching
    staleTime: 60 * 1000,
    // retry is the number of times to retry the query if it fails
    retry: 3,
  });
};

export default AssigneeSelect;

// TODO: deep dive into the queryKey and queryFn
