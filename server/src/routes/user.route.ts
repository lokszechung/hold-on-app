import express from "express";
import getUserController from "../controllers/userControllers/getUser.controller";

const router = express.Router();

router.route("/:userId").get(getUserController);

export default router;
