import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from"bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import sendEmail, { subject } from "../../utils/sendingEmail.js";
import { sendEmail_templete } from "../../utils/sendEmai_templete.js";
const register=async(req,res,next)=>{

try {
        // res.json({message:"register work "})

    const {userName,email,password,ConfirmPassword,Phone}=req.body;

    if(password!=ConfirmPassword){
        // return res.json({message:"password dosen't match"})
        return next(new Error("password dosen't match"))
    }

    // check email

    const userCheck = await userModel.findOne({email})
        if(userCheck){
            // return res.json({message:"email is already Exist",userCheck})
            return next(new Error("email is already Exist"))
        }

        ///hash Password

        const hashPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS));

        //hash phone Number 
        const Encrypt_phone=CryptoJS.AES.encrypt(Phone,process.env.Phone_private_key).toString();

    // const schema=Joi.object({
    //     id:Joi.string().pattern(new RegExp(/^[0-9]{14}$/)),
    // userName:Joi.string().min(3).max(20).required().lowercase(),
    // email:Joi.string().email().required(),
    // password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    // confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
    // age:Joi.number().min(10).max(13).required(),
    // skills:Joi.array().items(Joi.string().required()).required(),

    // }).required()

    // const result=schema.validate

    const user=await userModel.create({
        userName,
        email,
        password:hashPassword,
        Phone:Encrypt_phone
    })

    ///sending Email
    //step1_ token

    const token=jwt.sign({email},process.env.EMAIL_KEY);
    const verify_link=`https://sarahavarsion2.eu-4.evennode.com/auth/activate_account/${token}`
   await sendEmail({
        to:email,
        subject:subject.register,
        html:sendEmail_templete(verify_link)
    })

    res.json({message:"Donnne",user})

} catch (error) {
    // res.json({message:"Faild To Add user",error})
    return next(error)
}

}



const login=async(req,res,next)=>{
try {
        // res.json({message:"login work "})

    const {email,password}=req.body;

    const user=await userModel.findOne({email});
    if(!user){
    //  return   res.json({message:"please try, again"}
    //     )

    return next(new Error("please try, again"))
    }
 
    if(!user.ConfirmEmail){
        return next(new Error("Please verify your email before logging in"));
    }

    const passwordMatch=await bcrypt.compare(password,user.password)

    if(!passwordMatch){
    //   return  res.json({message:"password dosen't match"})
     return next(new Error("password dosen't match"))
    }
 

    // generate Token
    const usertoken=jwt.sign({id:user._id},process.env.USER_SERCRET_KEY,{expiresIn:'1h'})
    
    user.token=usertoken;
    await user.save();
   return res.json({message:"LogedIn Success",Token:usertoken})
} catch (error) {
    //  res.json({message:"Faild To Login",error})
    return next(error)
}
}


const activate_account=async(req,res,next)=>{
    try {
        const{token}=req.params;
        const{email}=jwt.verify(token,process.env.EMAIL_KEY);
        const user=await userModel.findOne({email});
        if(!user){
        //  return   res.json({message:"user Not Found"})
        return next(new Error("user Not Found"))
        }
        if(user.ConfirmEmail==true){
            // return res.json({message:"user mail already activated"})
            return next(new Error("user mail already activated"))
        }
        user.ConfirmEmail=true;
        
      await  user.save();
     
      res.json({message:"user Activated successfully",user})

    } catch (error) {
        //  res.json({message:error})
        return next(error)
    }
}
export{
    register,
    login,
    activate_account
}


