import { Request, Response } from "express";
import createUserService from "../../services/authServices/createUser.service";

const signUpUserController = async (
	req: Request,
	res: Response
): Promise<void> => {
	const requiredFields = ["id", "firstName", "lastName", "role"];
	const missingFields = requiredFields.filter((field) => !req.body[field]);

	if (missingFields.length > 0) {
		res
			.status(400)
			.json({ message: `Missing fields: ${missingFields.join(", ")}` });
		return;
	}

	try {
		const user = await createUserService(req.body);

		if (user) {
			res.status(201).json({ message: "User created", user });
			return;
		}
	} catch (error: any) {
		console.log("Error in sign up controller", error);
		res.status(500).json({ message: error.message });
		return;
	}
};

export default signUpUserController;
