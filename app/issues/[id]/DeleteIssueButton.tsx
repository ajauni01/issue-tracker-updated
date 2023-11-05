"use client";

import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  // router hook to redirect the user to the issues page after deleting the issue
  const router = useRouter();
  // show the error dialog box if an error occur
  const [error, setError] = useState(false);
  // show the loading spinner and disable the delete button if the issue is being deleted
  const [isDeleting, setIsDeleting] = useState(false);
  // show the toast message if the issue is deleted successfully
  const showToastMessage = () => {
    toast.error("The issue has been deleted !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  // deleteIssue function to delete an issue
  // deleteIssue function to delete an issue
  const deleteIssue = async () => {
    try {
      // set the setIsDeleting state to true to show the loading spinner and disable the delete button
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      // show the toast message if the issue is deleted successfully
      showToastMessage();
      // redirect the user to the issues page after deleting the issue
      router.push("/issues");
      // refresh the page to show the updated issues list
      router.refresh();
    } catch (error) {
      // set the setIsDeleting state to false to hide the loading spinner and enable the delete button
      setIsDeleting(false);
      // set the error state to true if an error occur
      setError(true);
    }
  };
  return (
    <>
      <ToastContainer />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          {/* disable the button upon while issue is being deleted from the database */}
          <Button disabled={isDeleting} color="red">
            <TrashIcon />
            Delete Issue
            {/* render the spinner component while an issue is being deleted */}
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this? This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              {/* call the delete api to delete an issue */}
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* show the error dialog box if an error occur in the try-catch statement */}
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="center">
            <Button variant="soft" color="gray" onClick={() => setError(false)}>
              Ok
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
// TODO: thoroughly investigate why I don't need to mention the 'api' folder in the delete url
