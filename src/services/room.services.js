import { prisma } from "../config/db.js";

export async function getAllRooms() {
  return prisma.room.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getRoomById(id) {
  return prisma.room.findUnique({
    where: { id },
    include: {
      sessions: {
        include: {
          speakers: {
            include: {
              speaker: true,
            },
          },
        },
        orderBy: {
          start_time: "asc",
        },
      },
    },
  });
}

export async function createRoom(data) {
  return prisma.room.create({
    data,
  });
}

export async function updateRoom(id, data) {
  return prisma.room.update({
    where: { id },
    data,
  });
}

export async function deleteRoom(id) {
  return prisma.room.delete({
    where: { id },
  });
}