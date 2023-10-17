'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useCallback, useMemo, useState } from 'react';

const NewIssuePage = () => {

  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
        <TextField.Input placeholder='Title' />
      </TextField.Root>
      {/* TextArea to write the issue */}
      <SimpleMDE
        placeholder='Please describe your issue' />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;

// TODO: create a markdown editor for the issue description