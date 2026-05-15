import prisma from "../config/db.js";

export const createTrip = async (
  data: any
) => {
  const { createdBy, ...tripData } = data;
  return prisma.trip.create({
    data: {
      ...tripData,
      createdBy,
      members: {
        create: {
          userId: createdBy,
          role: "OWNER",
        },
      },
    },
  });
};

export const getTrips = async (userId: string) => {
  return prisma.trip.findMany({
    where: { createdBy: userId },
  });
};

export const getTripById = async (
  id: string
) => {
  return prisma.trip.findUnique({
    where: { id },
  });
};

export const updateTrip = async (
  id: string,
  data: any
) => {
  return prisma.trip.update({
    where: { id },
    data,
  });
};

export const deleteTrip = async (
  id: string
) => {
  return prisma.trip.delete({
    where: { id },
  });
};

export const getUserTrips = async (userId: string) => {
  return prisma.trip.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: true,
    },
  });
};