import jwt from "jsonwebtoken";
import { Response } from "express";

type Role = "ADMIN" | "LEADER" | "YOUTH";

const generateToken = (userId: string, role: Role, res: Response) => {
	try {
		const token = jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
			expiresIn: "7d",
		});

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, //milliseconds
			// partitioned: true
			httpOnly: true,
			sameSite: "lax",
			secure: false,
		});

		return token;
	} catch (error) {
		console.log("Error in generateToken", error);
		return null;
	}
};

export default generateToken;
