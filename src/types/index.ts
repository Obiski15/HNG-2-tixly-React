import type { TicketInput } from "../schema/ticket.schema";

export interface User {
  name: string;
  id: string;
  email: string;
}

export interface Ticket extends TicketInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}
