import { Response,  } from "express"
export const ResponseHandler=(res:Response,status:number,success:number,error:any,data:any)=>{
    res.status(status).json({success,error,data})
}