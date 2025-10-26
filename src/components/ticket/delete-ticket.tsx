import { forwardRef, useRef } from "react";
import { useTicket } from "../../hooks/useTicket";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Ticket {
  id: string;
  title: string;
}

const DeleteTicket = forwardRef<HTMLButtonElement | null, { ticket: Ticket }>(
  ({ ticket: { id: ticketId, title } }, ref) => {
    const { deleteTicket } = useTicket();
    const closeDialogRef = useRef<HTMLButtonElement | null>(null);

    const handleDelete = async () => {
      try {
        await deleteTicket(ticketId);
      } finally {
        closeDialogRef.current?.click();
      }
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger className="hidden" ref={ref}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              ticket {title}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              ref={closeDialogRef}
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

export default DeleteTicket;
