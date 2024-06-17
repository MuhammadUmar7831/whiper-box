import { Router } from "express";
import { getUser, sendMessage } from "../controllers/message.controller";

const router = Router();

router.get('/getUser/:userId', getUser);
router.post('/send/:userId', sendMessage);

export default router;