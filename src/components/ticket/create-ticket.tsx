import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { ticketSchema, type TicketInput } from "../../schema/ticket.schema";

import { useTicket } from "../../hooks/useTicket";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CreateTicket = forwardRef<HTMLButtonElement | null>((_, ref) => {
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);
  const { createTicket, status } = useTicket();
  const form = useForm<TicketInput>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    },
  });

  const _onSubmit: SubmitHandler<TicketInput> = async (values) => {
    try {
      await createTicket(values);
    } finally {
      dialogCloseRef.current?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger ref={ref} className="hidden"></DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new ticket
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div>
              <Label htmlFor="title">Title</Label>
            </div>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              {...form.register("title")}
              aria-invalid={!!form.formState.errors.title}
            />
            {form.formState.errors.title && (
              <p className="text-destructive text-sm">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <Label htmlFor="description">Description</Label>
            </div>
            <Textarea
              id="description"
              placeholder="Detailed description of the ticket"
              rows={4}
              {...form.register("description")}
              aria-invalid={!!form.formState.errors.description}
            />
            {form.formState.errors.description && (
              <p className="text-destructive text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <Label>Status</Label>
              </div>
              <Select
                value={form.watch("status")}
                onValueChange={(value) =>
                  form.setValue("status", value as TicketInput["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div>
                <Label>Priority</Label>
              </div>
              <Select
                value={form.watch("priority")}
                onValueChange={(value) =>
                  form.setValue("priority", value as TicketInput["priority"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button
                ref={dialogCloseRef}
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={status === "isCreating"}>
              Create Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default CreateTicket;
