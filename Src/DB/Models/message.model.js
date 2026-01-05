
import mongoose, { Schema, Types } from "mongoose";

const messageSchema=new Schema({
    content:{
        type:String,
        required:true
    },

    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    reciever:{
         type:Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

export  const messageModel=mongoose.model("Message",messageSchema)