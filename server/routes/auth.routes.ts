import express from "express";
import { getUser, login } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

router.post('/', login);
router.get('/getUser', authenticate, getUser);

export default router;