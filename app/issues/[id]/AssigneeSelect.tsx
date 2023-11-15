"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

const AssigneeSelect = () => {
  // useState hook to store the current state of the users
  const [users, setUsers] = useState<User[]>([]);
  // useEffect is a hook that lets you perform side effects in function components
  useEffect(() => {
    // fetchUsers is an async function that fetches the users from the database
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      //   setUsers is a function that updates the users state
      setUsers(data);
    };
    // call the fetchUsers function to populate the users state
    fetchUsers();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
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
