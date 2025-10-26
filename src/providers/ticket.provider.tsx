import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { type Ticket } from "../types";

import type { TicketInput } from "../schema/ticket.schema";
import {
  createTicket as createTicketService,
  deleteTicket as deleteTicketService,
  editTicket as editTicketService,
  getTickets as getTicketsService,
} from "../services/ticket.service";

interface Stats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

interface ITicket {
  stats: Stats;
  status: "isCreating" | "isEditing" | "isDeleting" | "isFetching" | "idle";
  tickets: Ticket[] | null;
  createTicket: (data: TicketInput) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  editTicket: (data: Partial<Ticket>) => Promise<void>;
  getTickets: () => Promise<void>;
}

const TicketContext = createContext<ITicket | undefined>(undefined);

function TicketProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ITicket["status"]>("idle");
  const [tickets, setTickets] = useState<Ticket[] | null>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    open: 0,
    closed: 0,
    inProgress: 0,
  });

  useEffect(() => {
    if (tickets) {
      const closed = tickets.filter(
        (ticket) => ticket.status === "closed",
      ).length;
      const open = tickets.filter((ticket) => ticket.status === "open").length;
      const inProgress = tickets.filter(
        (ticket) => ticket.status === "in_progress",
      ).length;

      setStats({ closed, open, inProgress, total: tickets.length });
    }
  }, [tickets]);

  const refetch = async () => {
    const tickets = await getTicketsService();
    setTickets(tickets);
  };

  const createTicket = async (data: TicketInput) => {
    try {
      setStatus("isCreating");
      await createTicketService(data);
      await refetch();
      toast.success("Ticket created");
    } catch (e) {
      toast.error((e as unknown as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      setStatus("isDeleting");
      await deleteTicketService(id);
      await refetch();
      toast.success("Ticket Deleted");
    } catch (e) {
      toast.error((e as unknown as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  const editTicket = async (data: Partial<Ticket>) => {
    try {
      setStatus("isEditing");
      await editTicketService(data);
      await refetch();
      toast.success("Ticket updated");
    } catch (e) {
      toast.error((e as unknown as Error).message);
    } finally {
      setStatus("idle");
    }
  };

  const getTickets = async () => {
    try {
      setStatus("isFetching");
      await refetch();
    } finally {
      setStatus("idle");
    }
  };

  return (
    <TicketContext.Provider
      value={{
        status,
        stats,
        tickets,
        createTicket,
        editTicket,
        deleteTicket,
        getTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export { TicketContext };

export default TicketProvider;
