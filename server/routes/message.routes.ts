import { Router } from "express";
import { getUser } from "../controllers/message.controller";

const router = Router();

router.get('/getUser/:userId', getUser);

export default router;