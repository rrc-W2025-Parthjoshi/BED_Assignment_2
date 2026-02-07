import { Request, Response } from "express";
import { createTicket, getAllTickets, getTicketById, TicketPriority } from "../services/ticketService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const createTicketHandler = (req: Request, res: Response): void => {
  const { title, description, priority } = req.body;

  if (!title) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ 
      message: "Missing required field: title" 
    });
    return;
  }

  if (!description) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ 
      message: "Missing required field: description" 
    });
    return;
  }

  if (!priority) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ 
      message: "Missing required field: priority" 
    });
    return;
  }

  const validPriorities: TicketPriority[] = ["critical", "high", "medium", "low"];
  if (!validPriorities.includes(priority as TicketPriority)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ 
      message: "Invalid priority. Must be one of: critical, high, medium, low" 
    });
    return;
  }

  const ticket = createTicket(title, description, priority as TicketPriority);
  res.status(HTTP_STATUS.CREATED).json(ticket);
};

export const getAllTicketsHandler = (_req: Request, res: Response): void => {
  const tickets = getAllTickets();
  res.status(HTTP_STATUS.OK).json(tickets);
};

export const getTicketByIdHandler = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const ticket = getTicketById(id);

  if (!ticket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    return;
  }

  res.status(HTTP_STATUS.OK).json(ticket);
};