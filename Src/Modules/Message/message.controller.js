import { messageModel } from "../../DB/Models/message.model.js";
import { userModel } from "../../DB/Models/user.model.js";
import { Flags } from "./message.validation.js";


 const CreateMessage=async(req,res,next)=>{
    try {
        const{content,sender,reciever}=req.body;
        console.log("CreateMessage Attempt:", { content, sender, reciever });

        const user=await userModel.findById(reciever);
        if(!user){
            return next(new Error("User NotFound"))
        }

        const message=await messageModel.create({
            content,
            sender,
            reciever
        })
        console.log("Message Created DB Record:", message);
     return   res.json({result:"message added Successfully",message})

    } catch (error) {
        console.error("CreateMessage Error:", error);
        return next(error)
    }
}
 const getMessage=async(req,res,next)=>{
    try {
       const {messageId}=req.params;

    //    const message=await messageModel.findById(messageId).populate("sender")
       const message=await messageModel.findById(messageId).populate([
        {path:"sender",select:"userName , email ,-_id"},
        {path:"reciever",select:"userName , email ,-_id"},
       ])

       if(!message){
        return next(new Error("message Not Found",{cause:400}))
       }
       return res.json({result:"message get succesflly",message})
    } catch (error) {
        return next(error)
    }
}
 const getALLMessages=async(req,res,next)=>{
    try {
       
        // sender , reciever

        const{flag,sender,reciever} = {...req.body, ...req.query};
        console.log("getALLMessages Request:", { flag, sender, reciever });
        
        let message;
        if(flag==Flags.inbox){
         console.log("Fetching INBOX for reciever:", reciever);
         message=await messageModel.find({reciever}).populate('sender', 'userName email');
        }
        else if(flag==Flags.outbox){
            console.log("Fetching OUTBOX for sender:", sender);
            message=await messageModel.find({sender}).populate('reciever', 'userName email');
        }
        
        if (message && message.length > 0) {
            console.log("First Message Sample:", {
                id: message[0]._id,
                sender: message[0].sender?._id || message[0].sender, // Handle populated vs unpopulated
                reciever: message[0].reciever?._id || message[0].reciever,
                content: message[0].content
            });
        }
        console.log(`Found ${message?.length || 0} messages`);
        return res.json({result:"Messages get Successfully",message})
    } catch (error) {
        return next(error)
    }
}
 const DeleteMessage= async (req,res,next)=>{
    try {
        const {id}=req.params;
        const result = await messageModel.deleteOne({_id:id});
        if(result.deletedCount==0){
             return next(new Error("Message not found or already deleted"));
        }
        return res.json({message:"messagee deleted success"})
    } catch (error) {
        return next(error)
    }
}

export{
    CreateMessage,
    getALLMessages,
    getMessage,
    DeleteMessage
}