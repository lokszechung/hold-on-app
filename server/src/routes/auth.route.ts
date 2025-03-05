import express from "express";
import signUpUserController from "../controllers/authControllers/signUpUser.controller";
import loginUserController from "../controllers/authControllers/loginUser.controller";

const router = express.Router();

router.route("/signup").post(signUpUserController);
router.route("/login").post(loginUserController);

export default router;
