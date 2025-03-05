import { Request, Response } from "express";
import authenticateUserService from "../../services/authServices/authenticateUser.service";
import generateToken from "../../utils/generateToken";

const loginUserController = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: "Missing username or password" });
		return;
	}

	try {
		const foundUser = await authenticateUserService(username, password);

		generateToken(foundUser.id, res);

		const { password: _, ...user } = foundUser;

		res.status(200).json({ message: "User logged in", user });
		return;
	} catch (error: any) {
		if (error.message === "Invalid username or password") {
			res.status(400).json({ message: "Invalid username or password" });
			return;
		}
		if (error.message === "Youth attempting log in") {
			res.status(400).json({
				message:
					"Youth cannot log in. Please contact a leader if you need help.",
			});
			return;
		}
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

export default loginUserController;
