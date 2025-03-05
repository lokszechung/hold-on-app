import prisma from "../../db/prisma";
import bcryptjs from "bcryptjs";

const authenticateUserService = async (username: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
	});

	if (!user) {
		console.log("No user found");
		throw new Error("Invalid username or password");
	}

	if (!user.password) {
		console.log("Youth log in attempt");
		throw new Error("Youth attempting log in");
	}

	const passwordMatch = await bcryptjs.compare(password, user.password);

	if (!passwordMatch) {
		console.log("Password does not match");
		throw new Error("Invalid username or password");
	}

	return user;
};

export default authenticateUserService;
