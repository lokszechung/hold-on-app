import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

type Role = "ADMIN" | "LEADER" | "YOUTH";

interface DecodedPayload extends JwtPayload {
	userId: string;
	role: Role;
}

declare global {
	namespace Express {
		interface Request {
			user?:
				| {
						id: string;
				  }
				| undefined;
		}
	}
}

const secureRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			console.log("Unauthorized - No token in secure route");
			res
				.status(401)
				.json({ message: "Unauthorized - No token in Secure Route" });
			return;
		}

		console.log("token found in secure route");

		let decodedPayload;

		try {
			decodedPayload = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as DecodedPayload;
		} catch (error: any) {
			res.status(401).json({ message: "Unauthorized - Invalid token" });
			return;
		}

		if (!decodedPayload) {
			res.status(401).json({ message: "Unauthorized - Invalid token" });
			return;
		}

		const user = await prisma.user.findUnique({
			where: {
				id: decodedPayload.userId,
			},
		});

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		req.user = user;

		next();
	} catch (error: any) {
		console.log("Error in secureRoute middleware", error);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};
