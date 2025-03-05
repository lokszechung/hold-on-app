import { Request, Response } from "express";
import getUserService from "../../services/userServices/getUser.service";

const getUserController = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const foundUser = await getUserService(userId);

		if (!foundUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const { password: _, ...user } = foundUser;

		res.status(200).json(user);
		return;
	} catch (error: any) {
		res.status(400).json({ message: error.message });
		return;
	}
};

export default getUserController;
