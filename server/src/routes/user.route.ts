import express from "express";
import getUserController from "../controllers/userControllers/getUser.controller";
import updatePointsController from "../controllers/userControllers/updatePoints.controller";

import secureRoute from "../middleware/secureRoute";

const router = express.Router();

router.route("/:userId").get(getUserController);
router.route("/:userId/points").patch(secureRoute, updatePointsController);

export default router;
