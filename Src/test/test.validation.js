
import Joi from "joi";

// validation


//1- data
const user={
    userName:"e",
    email:"esmgmail.com",
    password:"esm12",
    confirmPassword:"esm123",
    age:24,
    skills:[10,"HTML","CSS","JS"],
    id:"30109014002355"
}

//2- schema (set of rules)

const schema=Joi.object({
    id:Joi.string().pattern(new RegExp(/^[0-9]{14}$/)),
 userName:Joi.string().min(3).max(20).required().lowercase(),
email:Joi.string().email().required(),
password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
confirmPassword:Joi.string().valid(Joi.ref("password")).required(),
age:Joi.number().min(10).max(13).required(),
skills:Joi.array().items(Joi.string().required()).required(),

}).required()
//3- validation (data ,rules)

const result=schema.validate(user,{abortEarly:true})
console.log(result);
