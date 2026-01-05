
import { Router } from "express";
import * as AUC from './Auth.controller.js'
import * as USC from "./auth.validation.js"
import validation from "../../middlewares/validation.middle.js";
import { authMiddle } from "../../middlewares/auth.middle.js";
const router=Router();


router.post("/register",validation(USC.registerSchema),AUC.register);
router.post("/login",validation(USC.loginSchema),AUC.login);
router.get("/activate_account/:token",authMiddle,AUC.activate_account)
export default router;