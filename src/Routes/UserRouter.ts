import express from "express";
import { AddUserAdmin, activateUser, deactivateUser, deleteUser, getRequestedCustomer, getUsers } from "../Controlers/UserController";
import { body } from "express-validator"
const UserRouter = express.Router();


UserRouter.post("/addUser",
    body('customername').isString().notEmpty(),
    body('customerKey').isNumeric().notEmpty(),
    body('customerimage').isURL().notEmpty(),
    AddUserAdmin)
UserRouter.get("/getUser", getUsers)
UserRouter.delete("/deleteUser", deleteUser)
UserRouter.get("/getUserById", getRequestedCustomer)
UserRouter.get("/deactivateUser", deactivateUser)
UserRouter.get("/activateUser", activateUser)

export default UserRouter