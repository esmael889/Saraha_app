
 const validation=(schema)=>{
    return (req,res,next)=>{
        /*
        */
        const data={...req.body,...req.params,...req.query}
        const result=schema.validate(data,{abortEarly:false});
        //condition result
        // const errormessage=result.error.details.map((obj)=>obj.message);
        if(result.error){
            // return res.json(result.error)
            return next(result.error)
        }
        return next()
    }
}

export default validation;