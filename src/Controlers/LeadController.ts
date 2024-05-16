import { Request, Response } from "express";
import db from "../Database/DatabaseConnector"
import { LeadSchema, UserSchema } from "../Database/Schema/Schema";
import { eq } from "drizzle-orm";
import { ResponseHandler } from "../Methods/Utilities/ResponseHandler";
import { validationResult } from "express-validator";
import { Result } from "express-validator";

export const postLead = async (req: Request, res: Response) => {
    try {
        const result: Result = validationResult(req);
        if (!result.isEmpty()) {
            ResponseHandler(res, 200, 1, result.array(), "Error in Data sent")
            return
        }

        const Useractive = await db.select().from(UserSchema).where(eq(UserSchema.customerKey, req.body.clientId));
        if (!Useractive[0]) {
            ResponseHandler(res, 200, 1, null, "No Such User Exists")
            return
        }

        else if (Useractive[0].status === false) {
            ResponseHandler(res, 200, 1, null, "User is not active")
            return
        }

        db.insert(LeadSchema).values({
            clientId: req.body.clientId,
            purpose: req.body.purpose,
            email: req.body.email,
            phone: req.body.contact,
            responsetoit: "None",
            name: req.body.clientname,
            read: false,
        }).then((response: any) => {
            ResponseHandler(res, 200, 1, null, response);
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null);
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null);
    }
}

export const getLeadsOfCustomer = (req: Request, res: Response) => {
    try {
        const customerkey: number = Number(req.headers.customerkey);
        db.select().from(LeadSchema).where(eq(LeadSchema.clientId, customerkey)).then((response: any) => {
            ResponseHandler(res, 200, 1, null, response);
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null);
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null);
    }
}

export const updateStatusofLead = (req: Request, res: Response) => {
    try {
        const Leadid: number = Number(req.headers.leadid);
        const status: string = req.body.status;
        db.select().from(LeadSchema).where(eq(LeadSchema.leadid, Leadid)).then((Lead: any) => {
            if (Lead[0]) {
                db.update(LeadSchema).set({ status: status }).where(eq(LeadSchema, Leadid)).then((response) => {
                    ResponseHandler(res, 200, 1, null, response);
                })
            }
            else {
                ResponseHandler(res, 200, 1, null, "No Such Lead Exists");
            }
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null)
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null)
    }
}

export const responsetoaLead = (req: Request, res: Response) => {
    try {
        const leadid: number = Number(req.headers.leadid)
        const responseoflead: string = req.body.response;
        db.select().from(LeadSchema).where(eq(LeadSchema.leadid, leadid)).then((Lead) => {
            if (Lead[0]) {
                db.update(LeadSchema).set({ responsetoit: responseoflead }).where(eq(LeadSchema.leadid, leadid)).then((response) => {
                    ResponseHandler(res, 200, 1, null, response);
                }).catch((error: any) => {
                    ResponseHandler(res, 500, 0, error, null)
                })
            }
            else {
                ResponseHandler(res, 200, 1, null, "No Lead with this Id exists")
            }
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null)
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null)
    }
}

export const getLimitedLeads = (req: Request, res: Response) => {
    try {
        const customerid: number = Number(req.headers.customerid);
        const limit: number = Number(req.headers.limit) * 10;

        db.select().from(LeadSchema).where(eq(LeadSchema.clientId, customerid)).limit(limit).then((Leads: any) => {
            ResponseHandler(res, 200, 1, null, Leads)
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null)
        })

    } catch (error) {
        ResponseHandler(res, 500, 0, error, null)
    }
}