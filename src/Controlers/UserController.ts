import { Request, Response, response } from "express"
import { ResponseHandler } from "../Methods/Utilities/ResponseHandler"
import { UserSchema } from "../Database/Schema/Schema"
import db from "../Database/DatabaseConnector"
import { eq } from "drizzle-orm"
import { validationResult } from "express-validator"

export const AddUserAdmin = (req: Request, res: Response) => {
    try {
        const result = validationResult(req)
        if(!result.isEmpty()){
            ResponseHandler(res,400,0,result.array(),"Errors in data sent");
        }
        db.insert(UserSchema).values({
            customername: req.body.customername,
            customerKey: req.body.customerKey,
            customerimage: req.body.customerimage,
            status: true
        }).then((response: any) => {
            // console.log({ response })
            ResponseHandler(res, 200, 1, null, response);
        }).catch((error: any) => {
            ResponseHandler(res, 500, 1, error, null);
        })
    } catch (error) {
        ResponseHandler(res, 500, 1, error, null);
    }
}

export const getUsers = (req: Request, res: Response) => {
    try {
        db.select().from(UserSchema).then((response: any) => {
            // console.log(response)
            ResponseHandler(res, 200, 1, null, response);
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null);
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null);
    }
}

export const getRequestedCustomer = (req: Request, res: Response) => {
    try {
        const id: number = Number(req.headers.id)
        db.select().from(UserSchema).where(eq(UserSchema, id)).then((response: any) => {
            if (response[0]) {
                ResponseHandler(res, 200, 1, null, response);
            }
            else {
                ResponseHandler(res, 200, 1, null, "No such user exists");
            }
        })
    } catch (error) {
        ResponseHandler(res, 200, 1, null, "No such user exists");
    }
}

export const deleteUser = (req: Request, res: Response) => {
    try {
        const id: number = Number(req.headers.customerid)
        // console.log({ id })
        db.select().from(UserSchema).where(eq(UserSchema.customerid, id)).then((customer: any) => {
            // console.log({ customer })
            if (customer[0]) {
                db.delete(UserSchema).where(eq(UserSchema.customerid, id)).then((response: any) => {
                    // console.log(response)
                    ResponseHandler(res, 200, 1, null, `Client ${customer[0].customername} is deleted`);
                })
            }
            else {
                ResponseHandler(res, 200, 1, null, "No User Exists");
            }
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null);
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null);
    }
}

export const deactivateUser = (req: Request, res: Response) => {
    try {
        const id: number = Number(req.headers.customerid)
        db.select().from(UserSchema).where(eq(UserSchema.customerid, id)).then((response: any) => {
            if (response[0]) {
                let customer: any = response[0];
                console.log({ customer })
                if (customer.status) {
                    db.update(UserSchema).set({ status: false }).where(eq(UserSchema.customerid, id)).then((response) => {
                        ResponseHandler(res, 200, 1, null, response);
                    })
                }
                else {
                    ResponseHandler(res, 200, 1, null, "User is Already Deactivated");
                }
            }
            else {
                ResponseHandler(res, 200, 1, null, "User Does'nt Exists Anymore");
            }
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null);
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null);
    }
}

export const activateUser = (req: Request, res: Response) => {
    try {

        const id: number = Number(req.headers.customerid)
        db.select().from(UserSchema).where(eq(UserSchema.customerid, id)).then((response: any) => {
            if (response[0]) {
                let customer: any = response[0];
                if (!customer.status) {
                    db.update(UserSchema).set({ status: true }).where(eq(UserSchema.customerid, id)).then((response: any) => {
                        ResponseHandler(res, 200, 1, null, response);
                    })
                }
                else {
                    ResponseHandler(res, 200, 1, null, "User Already Deactivated");
                }
            }
            else {
                ResponseHandler(res, 200, 1, null, "User Does'nt Exists Anymore");
            }
        }).catch((error: any) => {
            ResponseHandler(res, 500, 0, error, null);
        })
    } catch (error) {
        ResponseHandler(res, 500, 0, error, null);
    }
}