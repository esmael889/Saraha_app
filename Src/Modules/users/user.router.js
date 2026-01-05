
import { Router } from "express";
import * as UC from "./user.controller.js"
import { authMiddle } from "../../middlewares/auth.middle.js";
import * as USV from './user.validation.js'
import validation from "../../middlewares/validation.middle.js";
import { allowedExtenstions, multerFunction } from "../../../services/multerService.js";
const router =Router();

router.get("/",authMiddle,UC.getUser)
router.patch("/update",validation(USV.UpdateProfileSchema),UC.updateProfile)
router.patch("/changepassword",validation(USV.ChangePasswordSchema),UC.ChangePassword)
// router.post("/profile",multerFunction(allowedExtenstions.Images).single('profile'),UC.profilePicture)
router.post("/profile",authMiddle,multerFunction(allowedExtenstions.Images,'user/profile').single('profile'),UC.profilePicture)

export default router;