import { prisma } from "../config/db.js";
import { isSessionLive } from "../utils/session.utils.js";
import { executeWithAudit } from "../utils/auditLog.utils.js";
import { isExist } from "../validators/session.validators.js";
export async function getAllSessions() {
  const sessions = await prisma.session.findMany({
    include: {
      room: true,
      event: true,
      speakers: {
        include: {
          speaker: true,
        },
      },
    },
    orderBy: {
      start_time: "asc",
    },
  });

  return sessions.map((session) => ({
    ...session,
    is_live: isSessionLive(
      session.start_time,
      session.end_time
    ),
  }));
}

export async function getSessionById(id) {
  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      room: true,
      event: true,
      speakers: {
        include: {
          speaker: true,
        },
      },
      questions: {
        orderBy: {
          upvotes: "desc",
        },
      },
    },
  });

  if (!session) return null;

  return {
    ...session,
    is_live: isSessionLive(
      session.start_time,
      session.end_time
    ),
  };
}

export async function getLiveSessions() {
  const now = new Date();

  return await prisma.session.findMany({
    where: {
      start_time: {
        lte: now,
      },
      end_time: {
        gte: now,
      },
    },
    include: {
      room: true,
      speakers: {
        include: {
          speaker: true,
        },
      },
    },
  });
}

export async function getUpcomingSessions() {
  const now = new Date();

  const sessions = await prisma.session.findMany({
    where: {
      end_time: {
        gte: now,
      },
    },
    include: {
      room: true,
      event: true,
      speakers: {
        include: {
          speaker: true,
        },
      },
    },
    orderBy: {
      start_time: "asc",
    },
  });

  return sessions.map((session) => ({
    ...session,
    is_live: isSessionLive(session.start_time, session.end_time),
  }));
}

export async function getPastSessions() {
  const now = new Date();

  const sessions = await prisma.session.findMany({
    where: {
      end_time: {
        lt: now,
      },
    },
    include: {
      room: true,
      event: true,
      speakers: {
        include: {
          speaker: true,
        },
      },
    },
    orderBy: {
      start_time: "desc",
    },
  });

  return sessions.map((session) => ({
    ...session,
    is_live: false,
  }));
}

export async function createSession(data, userRole,
  userId) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  const {
    speaker_ids,
    start_time,
    end_time,
    capacity,
    ...sessionData
  } = data;

  return executeWithAudit({
    userId,
    action: "create",
    entityType: "session",
    operation: () =>
      prisma.session.create({
        data: {
          ...sessionData,
          start_time: new Date(start_time),
          end_time: new Date(end_time),

          capacity: capacity && capacity !== "" ? parseInt(capacity, 10) : null,

          speakers: {
            create: speaker_ids.map((speakerId) => ({
              speaker: {
                connect: {
                  id: speakerId,
                },
              },
            })),
          },
        },

        include: {
          speakers: {
            include: {
              speaker: true,
            },
          },
        },
      })
  });
}

export async function updateSession(id, data, userRole,
  userId) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  const {
    speaker_ids,
    start_time,
    end_time,
    capacity,
    ...sessionData
  } = data;

  const prismaUpdateData = { ...sessionData };

  if (start_time) prismaUpdateData.start_time = new Date(start_time);
  if (end_time) prismaUpdateData.end_time = new Date(end_time);

  if (capacity !== undefined) {
    prismaUpdateData.capacity = capacity && capacity !== "" ? parseInt(capacity, 10) : null;
  }
  isExist(id);
  return executeWithAudit({
    userId,
    action: "update",
    entityType: "session",
    entityId: id,
    operation: () =>
      prisma.session.update({
        where: { id },

        data: {
          ...prismaUpdateData,

          speakers: speaker_ids
            ? {
              deleteMany: {},
              create: speaker_ids.map((speakerId) => ({
                speaker: {
                  connect: {
                    id: speakerId,
                  },
                },
              })),
            }
            : undefined,
        },

        include: {
          speakers: {
            include: {
              speaker: true,
            },
          },
        },
      })
  });
}

export async function deleteSession(id, userRole,
  userId) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  isExist(id);
  return executeWithAudit({
    userId,
    action: "delete",
    entityType: "session",
    entityId: id,
    operation: () =>
      prisma.session.delete({
        where: { id },
      })
  });
}