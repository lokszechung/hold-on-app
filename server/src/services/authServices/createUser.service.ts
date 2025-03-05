import prisma from "../../db/prisma";
import bcryptjs from "bcryptjs";
import generateUsername from "../../utils/generateUsername";

type CreateUserData = {
	id: string;
	firstName: string;
	lastName: string;
	role: "ADMIN" | "LEADER" | "YOUTH";
};

const createUserService = async (createUserData: CreateUserData) => {
	const { firstName, lastName, role } = createUserData;

	let hashedPassword: string | null = null;

	if (role === "LEADER") {
		const defaultPassword = process.env.LEADER_DEFAULT_PASSWORD! || "changeme";
		const salt = await bcryptjs.genSalt(10);
		hashedPassword = await bcryptjs.hash(defaultPassword, salt);
	}

	const username = generateUsername(firstName, lastName);

	const createdUser = await prisma.user.create({
		data: {
			...createUserData,
			username,
			password: hashedPassword,
		},
	});

	const { password: _, ...user } = createdUser;

	return user;
};

export default createUserService;
