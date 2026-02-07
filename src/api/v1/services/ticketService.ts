import { tickets } from "../../../data/tickets";

export type TicketPriority = "critical" | "high" | "medium" | "low";
export type TicketStatus = "open" | "in-progress" | "resolved";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}

export const createTicket = (
  title: string,
  description: string,
  priority: TicketPriority
): Ticket => {
  const now = new Date().toISOString();

    const newTicket: Ticket = {
    id: tickets.length + 1,
    title,
    description,
    priority,
    status: "open",
    createdAt: now,
    };

  tickets.push(newTicket);
  return newTicket;
};

export const getAllTickets = (): Ticket[] => {
  return tickets;
};

export const getTicketById = (id: number): Ticket | undefined => {
  return tickets.find((t) => t.id === id);
};

export const updateTicket = (
  id: number,
  updates: {
    title?: string;
    description?: string;
    priority?: TicketPriority;
    status?: TicketStatus;
  }
): Ticket | undefined => {
  const index = tickets.findIndex((t) => t.id === id);
  
  if (index === -1) {
    return undefined;
  }

  tickets[index] = {
    ...tickets[index],
    ...updates,
  };

  return tickets[index];
};