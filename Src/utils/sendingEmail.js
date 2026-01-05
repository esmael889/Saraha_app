import nodemailer from "nodemailer";

const sendEmail=async({to,subject,html})=>{

//configration of mail (sending)

const trasnporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"esmaelll12367@gmail.com",
        pass:"egwc apfh kpsz kgci",
    }
})


const info=await trasnporter.sendMail({
    from:"esmaelll12367@gmail.com",
    to,
    subject,
    // text:"test sending mail text",
    html
})
// console.log(info);
return info.rejected.length===0?true:false
}

export const subject={
  register:"registered email",
  reset:"reset"
}
// sendEmail();
export default sendEmail;