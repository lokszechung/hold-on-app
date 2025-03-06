import { Request, Response } from "express";
import updatePointsService from "../../services/userServices/updatePoints.service";

const updatePointsController = async (req: Request, res: Response) => {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized - please log in" });
		return;
	}

	if (req.user.role !== "ADMIN" && req.user.role !== "LEADER") {
		res.status(401).json({ message: "Unauthorized - only leaders allowed" });
		return;
	}

	const { userId } = req.params;
	const { pointsChange } = req.body;

	if (!pointsChange) {
		res.status(400).json({ message: "Missing pointsChange" });
		return;
	}

	if (typeof pointsChange !== "number") {
		res.status(400).json({ message: "pointsChange must be a number" });
		return;
	}

	try {
		const updatedUser = await updatePointsService(userId, pointsChange);
		res.status(200).json(updatedUser);
		return;
	} catch (error: any) {
		console.log("Error in update points controller", error);
		res.status(400).json({ message: error.message });
		return;
	}
};

export default updatePointsController;
