import multer from "multer";
import path from "path";
import fs from 'fs';
export const allowedExtenstions={
    Images:["image/jpeg","image/png","image/webp"],
    Files:["application/pdf","application/javascript"],
    videos:["video/mp4"]
}
export const multerFunction=(allowedExtenstionsArr,customPath)=>{
    if(!allowedExtenstionsArr){
        allowedExtenstionsArr=allowedExtenstions.Images
    }
  //destination
  // filename =>storage

  ///////////// Storage////////////////////////
  const storage=multer.diskStorage({
    //destination
    destination:function(req,file,cb){
        const dePath=path.resolve(`uploads/${customPath}`)
        if(!fs.existsSync(dePath)){
            fs.mkdirSync(dePath,{recursive:true})
        }
        cb(null,dePath);
    },
    filename:function(req,file,cb){
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname)
    }
  })

  //////////////// Filter Data /////////////////////

  const fileFilter=function(req,file,cb){
    // if(file.mimetype=='image/avif'||file.mimetype=='image/jpeg'){
    //   return  cb(null,true)
    // }
     if(allowedExtenstionsArr.includes(file.mimetype)){
      return  cb(null,true)
    }

    cb(new Error("invalid Extenstion"),false)
  }

  const UploadFile=multer({fileFilter,storage});
  return UploadFile;
}