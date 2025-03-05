import express from "express";
import signUpUserController from "../controllers/authControllers/signUpUser.controller";
import logInUserController from "../controllers/authControllers/logInUser.controller";
import logOutUserController from "../controllers/authControllers/logOutUser.controller";

const router = express.Router();

router.route("/signup").post(signUpUserController);
router.route("/login").post(logInUserController);
router.route("/logout").post(logOutUserController);

export default router;
