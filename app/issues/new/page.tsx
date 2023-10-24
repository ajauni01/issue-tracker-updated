'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import { Spinner } from '@/app/components/Spinner';
import {marked} from "marked";

// IssueForm is the type of the data that we are going to send to the server
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState:{errors}} = useForm<IssueForm>({
    // integrate react hook form with zod for data validation
    resolver:zodResolver(createIssueSchema)
  });
  // console.log('register details', register('title'));
  // useState hook to handle the error
  const [error, setError] = useState("")
  // useState hook to handle the loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // function to handle the form submission
  const onSubmit = handleSubmit(async (data) => {
      try {
        //  set the loading state to true wile the data is sending to the server
        setIsSubmitting(true);
        await axios.post('/api/issues', data);
     //  route the user to the issues page after submitting the form
    router.push('/issues') 
      } catch (error) {
        // set the loading state to false if there is an error
        setIsSubmitting(false);
        setError('An unexpected error occurred')
      }
  })

  return (
    <div className='max-w-xl space-y-3'>
      {/* Display the error message */}
     {error &&  <Callout.Root color="red">
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
      {error}
    </Callout.Text>
  </Callout.Root>}
  
      <form  onSubmit={onSubmit}>
      <div className='mb-2'>
        {/* Title area and magnifying glass icon */}
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
        <TextField.Input placeholder='Title' {...register("title")} />
      </TextField.Root>
      </div>
      {/* display the error message related to the title */}
    <ErrorMessage>{errors.title?.message}</ErrorMessage>
      {/* TextArea to write the issue */}
      <Controller name="description" control={control}  render={({ field }) => <SimpleMDE placeholder='Please describe your issue' {...field} />} />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      {/* show the loader while submitting data and show the normal submit button otherwise */}
     {isSubmitting? <Spinner/> : <Button>Submit New Issue</Button>}
    </form>
    </div>
  );
};

export default NewIssuePage;

// TODO: create a markdown editor for the issue description
// TODO: understand the reason of using angle brackets in the TextField component
// TODO: understand the react hook form controller component
// TODO: thoroughly understand the react hook form
// TODO: understand the (type IssueForm = z.infer<typeof createIssueSchema>);
// TODO: Investigate why the markdown editor is not working (bold, h1, italic, etc). why all text is encloed in paragraph tag