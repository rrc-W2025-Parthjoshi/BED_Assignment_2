import { Router } from "express";
import { createTicketHandler,getAllTicketsHandler,getTicketByIdHandler,updateTicketHandler } from "../controllers/ticketController";

const router = Router();

router.post("/tickets", createTicketHandler);
router.get("/tickets", getAllTicketsHandler);
router.get("/tickets/:id", getTicketByIdHandler);
router.put("/tickets/:id", updateTicketHandler);

export default router;
