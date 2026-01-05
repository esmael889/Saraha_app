import jwt from "jsonwebtoken";
import { userModel } from "../DB/Models/user.model.js";


 export const authMiddle=async(req,res,next)=>{
try {
const{authorization}=req.headers
if(!authorization){
   return res.json({message:"token is required"})
}
const{id}= jwt.verify(authorization,process.env.USER_SERCRET_KEY);
   const user =await userModel.findOne({_id:id})
    /// everthing is okkkk

    req.user=user
    return next();
} catch (error) {
    res.json({message:"middleware error",error})
}
}