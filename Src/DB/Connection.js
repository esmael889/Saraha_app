
import mongoose from "mongoose";

const DBConnection=async()=>{
  await  mongoose.connect(process.env.DB_Connect_URI)
  .then((res)=>console.log("DB Connected Successfully")
  )
  .catch((err)=>console.log("Faild To Connect",err)
  )

}
export default DBConnection