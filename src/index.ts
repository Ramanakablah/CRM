import dotenv from "dotenv";
dotenv.config();
import { Express } from "express";
import express from "express"
import UserRouter from "./Routes/UserRouter";
import LeadRouter from "./Routes/LeadRouter";

const app:Express= express();

app.use(express.json());

app.use('/user',UserRouter);
app.use('/lead',LeadRouter)
app.listen(process.env.PORT,()=>{
    console.log("Listening at",process.env.PORT)
})