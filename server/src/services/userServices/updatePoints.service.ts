import prisma from "../../db/prisma";

const updatePointsService = async (userId: string, pointsChange: number) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { points: true }, // Only fetch points
	});

	if (!user) {
		throw new Error("User not found.");
	}

	if (user.points + pointsChange < 0) {
		throw new Error("Insufficient points.");
	}

	const updatedUser = await prisma.user.update({
		where: { id: userId },
		data: { points: { increment: pointsChange } },
	});

	return updatedUser;
};

export default updatePointsService;
