import prisma from "../config/db.js";

export const addMember = async (tripId: string, userId: string) => {
  return prisma.tripMember.create({
    data: {
      tripId,
      userId,
      role: "MEMBER",
    },
  });
};

export const getMembers = async (tripId: string) => {
  return prisma.tripMember.findMany({
    where: { tripId },
  });
};

export const removeMember = async (tripId: string, userId: string) => {
  return prisma.tripMember.delete({
    where: {
      tripId_userId: {
        tripId,
        userId,
      },
    },
  });
};
