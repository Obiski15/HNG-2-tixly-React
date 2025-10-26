import { useContext } from "react";
import { TicketContext } from "../providers/ticket.provider";

export const useTicket = () => {
  const context = useContext(TicketContext);

  if (!context)
    throw new Error(
      "Ticket context is being accessed outside of it's provider",
    );

  return context;
};
