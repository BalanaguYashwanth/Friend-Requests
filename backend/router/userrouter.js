import express from "express";
import { registerUser,authUser } from "../controllers/usercontroller.js";
const router = express.Router()

router.post('/registeruser',registerUser)
router.post('/authuser',authUser)


export default router