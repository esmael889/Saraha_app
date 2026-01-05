import mongoose, { Schema } from "mongoose";
const userSchema= new Schema({
    userName:{
        type:String,    
        required:[true,"userName is Required"],
        minLength:[3,"userName must be at least 3 character"],
        maxLength:[20,"userName must be at most 3 character"],
        trim:true,
        lowerCase:true,
        // unique:true
    },
    email:{
        type:String,
        required:[true,"email is Required"],
        unique:true,
        trim:true,
        match:[/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,"email must contain @"]
    },
    ConfirmEmail:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },

    gender:{
        type:String,
        enum:{
            values:["male","female","not specified"],
            default:"not specified",
            message:"gender must be male or female"
        }
    }
    ,

    role:{
        type:String,
        enum:{
            values:["user","admin"],
            default:"user",
            message:"role must be either user or admin"
        }
    },
    token:{
        type:String
    },

    BOD:String,
    address:String,
    Phone:String,
    Image:String

},{timestamps:true})



export const userModel=mongoose.model('User',userSchema)