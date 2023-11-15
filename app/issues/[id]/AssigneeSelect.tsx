"use client";

import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">John</Select.Item>
          <Select.Item value="2">Jane</Select.Item>
          <Select.Item value="3">Jessie</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
