
import express from "express";
import DBConnection from "./Src/DB/Connection.js";
import AuthRouter from "./Src/Modules/Auth/Auth.router.js";
import userRouter from "./Src/Modules/users/user.router.js"
import messageRouter from './Src/Modules/Message/message.router.js'
import cors from "cors";
import { configDotenv } from "dotenv";
const app=express();
configDotenv();

app.use((req, res, next) => {
    // console.log(`[REQUEST] ${req.method} ${req.url}`);
    // console.log("Headers:", req.headers);
    next();
});

DBConnection()
app.use(cors())
app.use(express.json());
app.use(express.json());

// for test

// app.get("/test",(req,res,next)=>{
//     next({userName:"Hello from global"});
// })
app.use("/auth",AuthRouter);
app.use("/user",userRouter);
app.use("/message",messageRouter)
app.use('/uploads', express.static('uploads'));

app.use((req,res)=>{
    res.json({message:"not handler Path"})
})

//global middleware
app.use((error,req,res,next)=>{
    
   return res.json({error:error.message,cause:400})
})
app.listen(parseInt(process.env.PORT),()=>{
    console.log("Server is Runnning")
})