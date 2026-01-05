
import { Router } from "express";
import * as MSGC from "./message.controller.js"
import * as MSGV from './message.validation.js'
import validation from "../../middlewares/validation.middle.js";
const router=Router();

router.post("/",validation(MSGV.CreateMessageSchema),MSGC.CreateMessage)
router.get("/AllMessages",validation(MSGV.AllMessages_Schema),MSGC.getALLMessages)
router.get("/:messageId",validation(MSGV.singleMessageSchema),MSGC.getMessage)
router.delete("/:id",MSGC.DeleteMessage)

export default router;