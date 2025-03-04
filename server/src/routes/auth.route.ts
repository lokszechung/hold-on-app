import express from "express";
import signUpUserController from "../controllers/authControllers/signUpUser.controller";

const router = express.Router();

router.route("/signup").post(signUpUserController);

export default router;
