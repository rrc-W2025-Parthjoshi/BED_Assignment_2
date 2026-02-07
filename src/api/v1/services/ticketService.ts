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

export interface TicketUrgency extends Ticket {
  ticketAge: number;
  urgencyScore: number;
  urgencyLevel: string;
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

export const deleteTicket = (id: number): boolean => {
  const index = tickets.findIndex((t) => t.id === id);
  
  if (index === -1) {
    return false;
  }

  tickets.splice(index, 1);
  return true;
};

export const calculateTicketUrgency = (id: number): TicketUrgency | undefined => {
  const ticket = getTicketById(id);
  
  if (!ticket) {
    return undefined;
  }

  // If ticket is resolved, urgency is minimal
  if (ticket.status === "resolved") {
    return {
      ...ticket,
      ticketAge: Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
      urgencyScore: 0,
      urgencyLevel: "Minimal. Ticket resolved.",
    };
  }

  // Calculate ticket age in days
  const ticketAge = Math.floor(
    (Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Base scores by priority
  const baseScores: Record<TicketPriority, number> = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
  };

  // Calculate urgency score: baseScore + (age * 5)
  const urgencyScore = baseScores[ticket.priority] + (ticketAge * 5);

  // Determine urgency level based on score
  let urgencyLevel: string;
  if (urgencyScore >= 70) {
    urgencyLevel = "Critical. Immediate attention required.";
  } else if (urgencyScore >= 50) {
    urgencyLevel = "High urgency. Prioritize resolution.";
  } else if (urgencyScore >= 30) {
    urgencyLevel = "Moderate. Schedule for attention.";
  } else {
    urgencyLevel = "Low urgency. Address when capacity allows.";
  }

  return {
    ...ticket,
    ticketAge,
    urgencyScore,
    urgencyLevel,
  };
};