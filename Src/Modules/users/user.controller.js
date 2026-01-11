import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const getUser=async(req,res,next)=>{
    //  const{Phone}=req.body
   
// decode Token

try {
         const{user}=req;   
               user.Phone=CryptoJS.AES.decrypt(user.Phone,process.env.Phone_private_key).toString(
        CryptoJS.enc.Utf8
    )
 return res.json({message:"user Controller works Well",user})
} 

catch (error) {
    // res.json({message:"internal server Error",error:error})
    return next(error)
}
}

const updateProfile=async(req,res,next)=>{
 try {
       const{_id}=req.query
    const user =await userModel.findById(_id);
    if(!user){
        return next(new Error("USer NotFound To update"))
    }

    const updatedUSer=await userModel.findOneAndUpdate({_id:user._id},{
        ...req.body
    },{new:true})
    res.json({message:"user Updated Successfully",updatedUSer})
 } catch (error) {
    return next(error)
 }
}

const ChangePassword=async(req,res,next)=>{

    try {
         const {email,CurrentPassword,newPassword}=req.body
    const user =await userModel.findOne({email});
    if(!user){
        return next(new Error("User NotFound"))
    }

    const matchPassword=bcrypt.compareSync(CurrentPassword,user.password);
    if(!matchPassword){
        return next(new Error("Password not Match"))
    }

    const hashPassword=bcrypt.hashSync(newPassword,parseInt(process.env.SALT_ROUNDS))

    user.password=hashPassword;
    await user.save();
    return res.json({message:"Password Changed Successfully",user})
    } catch (error) {
        return next(error)
    }

}

const profilePicture=async(req,res,next)=>{
    try {
        if(!req.file){
            return next(new Error("Please upload an image"));
        }
        // req.user is populated by authMiddle
        const user = await userModel.findById(req.user._id);
        if(!user) return next(new Error("User not found"));

        // Cloudinary puts the URL in req.file.path
        user.Image = req.file.path;
        await user.save();
        
        res.json({message:"Profile Picture Updated", user});
    } catch (error) {
        next(error);
    }
}
export{
    getUser,
    updateProfile,
    ChangePassword,
    profilePicture
}


