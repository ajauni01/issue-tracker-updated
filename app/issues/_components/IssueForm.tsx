"use client";
import { Spinner } from "@/app/components";
import ErrorMessage from "@/app/components/ErrorMessage";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

// IssueFormData is the type of the data that we are going to send to the server
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    // integrate react hook form with zod for data validation
    resolver: zodResolver(issueSchema),
  });

  // useState hook to handle the error
  const [error, setError] = useState("");
  // useState hook to handle the loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // function to handle the form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      //  set the loading state to true wile the data is sending to the server
      setIsSubmitting(true);
      // if the issue already exists, update it, otherwise create a new one
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else await axios.post("/api/issues", data);
      //  route the user to the issues page after submitting the form
      router.push("/issues");
      // refresh the issues page after submitting the form
      router.refresh();
    } catch (error) {
      // set the loading state to false if there is an error
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl space-y-3">
      {/* Display the error message */}
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-2">
          {/* Title area and magnifying glass icon */}
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder="Title"
              {...register("title")}
            />
          </TextField.Root>
        </div>
        {/* display the error message related to the title */}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* TextArea to write the issue using the SimpleMDE markdown editor */}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Please describe your issue" {...field} />
          )}
        />
        {/* show the error message to the user */}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {/* show the update issue or the submit new issue button and disable the button while submitting the form */}
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

// TODO: understand the react hook form controller component
// TODO: thoroughly understand the react hook form
// TODO: understand the (type IssueFormData = z.infer<typeof issueSchema>);
// TODO: Investigate why the markdown editor is not working (bold, h1, italic, etc). why all text is encloed in paragraph tag
// TODO: thoroughly investigate the mechanism of the prisma client / Issue model
