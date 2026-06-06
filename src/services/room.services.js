import { prisma } from "../config/db.js";
import { executeWithAudit } from "../utils/auditLog.utils.js";
import { isExist } from "../validators/room.validators.js";
export async function getAllRooms() {
  return await prisma.room.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getRoomById(id) {
  return await prisma.room.findUnique({
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

export async function createRoom(data, userRole,
  userId) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  return executeWithAudit({
    userId,
    action: "create",
    entityType: "room",
    operation: () =>
      prisma.room.create({
        data,
      })
  });
}

export async function updateRoom(id, data, userRole,
  userId) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  isExist(id);
  return executeWithAudit({
    userId,
    action: "update",
    entityType: "room",
    entityId: id,
    operation: () =>
      prisma.room.update({
        where: { id },
        data,
      })
  });
}

export async function deleteRoom(id, userRole,
  userId) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  isExist(id);
  return executeWithAudit({
    userId,
    action: "delete",
    entityType: "room",
    entityId: id,
    operation: () =>
      prisma.room.delete({
        where: { id },
      })
  });
}