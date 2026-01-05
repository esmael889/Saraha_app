
import Joi from "joi";
import { Types } from "mongoose";

export const CreateMessageSchema=Joi.object({
    content:Joi.string().required(),
      sender:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)) return true;
        return helper.message("please enter a valid objectID")
    }).required(),
    reciever:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)) return true;
        return helper.message("please enter a valid objectID")
    }).required()
}).required()

export const singleMessageSchema=Joi.object({
    messageId:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)) return true;
        return helper.message("please enter a valid  objectID for message")
    }).required()
}).required()

export const Flags={
    inbox:"inbox",
    outbox:"outbox"
}

export const AllMessages_Schema=Joi.object({
    flag:Joi.valid(...Object.values(Flags)).required(),
    sender:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)) return true;
        return helper.message("please enter a valid objectID")
    }),
    
    reciever:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)) return true;
        return helper.message("please enter a valid objectID")
    }).required()
}).required()