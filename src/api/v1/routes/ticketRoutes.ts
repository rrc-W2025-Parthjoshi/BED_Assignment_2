import { Router } from "express";
import { createTicketHandler,getAllTicketsHandler,getTicketByIdHandler } from "../controllers/ticketController";

const router = Router();

router.post("/tickets", createTicketHandler);
router.get("/tickets", getAllTicketsHandler);
router.get("/tickets/:id", getTicketByIdHandler);

export default router;
