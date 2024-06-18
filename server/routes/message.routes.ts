import { Router } from "express";
import { deleteUserMessage, getMessageByUser, getUser, sendMessage } from "../controllers/message.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const router = Router();

router.get('/getUser/:userId', getUser);
router.post('/send/:userId', sendMessage);
router.get('/getMessages/:userId', getMessageByUser);
router.delete('/deleteMessage/:messageId', authenticate, deleteUserMessage);

export default router;