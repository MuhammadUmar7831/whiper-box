import { Router } from "express";
import { getMessageByUser, getUser, sendMessage } from "../controllers/message.controller";

const router = Router();

router.get('/getUser/:userId', getUser);
router.post('/send/:userId', sendMessage);
router.get('/getMessages/:userId', getMessageByUser);

export default router;