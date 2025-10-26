import { z } from "zod";

export type TicketStatus = "open" | "in_progress" | "closed";

export const ticketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(200),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(2000),
  status: z.enum(["open", "in_progress", "closed"]),
  priority: z.enum(["low", "medium", "high"]),
});

export type TicketInput = z.infer<typeof ticketSchema>;
