import { Request, Response } from "express";

const logOutUserController = async (req: Request, res: Response) => {
	try {
		res
			.clearCookie("jwt")
			.status(200)
			.json({ message: "Logged out successfully" });
		return;
	} catch (error) {
		console.error("Error in logout controller", error);
		res.status(500).json({ error: "Internal server error" });
		return;
	}
};

export default logOutUserController;
