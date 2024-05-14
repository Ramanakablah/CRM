import express from "express"
import { getLeadsOfCustomer, getLimitedLeads, postLead, responsetoaLead, updateStatusofLead } from "../Controlers/LeadController";
const LeadRouter = express.Router();
import { body } from "express-validator"


LeadRouter.post("/postLead",
    body('contact').notEmpty(),
    body('email').isEmail(),
    body('clientId').isNumeric().notEmpty(),
    body("purpose").notEmpty().isString(),
    postLead);
LeadRouter.get("/getLeadOfCustomer", getLeadsOfCustomer);
LeadRouter.put("/updateStatusOfLead", updateStatusofLead);
LeadRouter.put("/responsetolead", responsetoaLead);
LeadRouter.get("/getLastinLimit", getLimitedLeads);

export default LeadRouter