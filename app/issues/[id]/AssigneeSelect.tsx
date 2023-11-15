"use client";

import Skeleton from "@/app/components/Skeleton";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    // queryKey is a unique identifier for the query
    queryKey: ["users"],
    // queryFn is a function that returns the data
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    // staleTime is the time in milliseconds before the data is considered stale // we are using it for caching
    staleTime: 60 * 1000,
    // retry is the number of times to retry the query if it fails
    retry: 3,
  });
  //   return the loading skeleton if the data is still loading
  if (isLoading) return <Skeleton />;
  //   return null if there is still error after retrying 3 times
  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;

// TODO: deep dive into the queryKey and queryFn
