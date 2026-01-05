
import Joi from "joi";

export const UpdateProfileSchema=Joi.object({
    email:Joi.string().email().required(),
    userName:Joi.string().required(),
    _id:Joi.string()
}).required()

export const ChangePasswordSchema=Joi.object({
    email:Joi.string().email().required(),
    CurrentPassword:Joi.string().required(),
    newPassword:Joi.string().not(Joi.ref("CurrentPassword")).required(),
    ConfirmPassword:Joi.string().valid(Joi.ref("newPassword")).required()
}).required()