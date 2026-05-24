import { prisma } from "../config/db.js";
import { isSessionLive } from "../utils/session.utils.js";

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
  const sessions = await prisma.session.findMany({
    include: {
      room: true,
      speakers: {
        include: {
          speaker: true,
        },
      },
    },
  });

  return sessions.filter((session) =>
    isSessionLive(
      session.start_time,
      session.end_time
    )
  );
}

export async function getSessionsByRoom(roomId) {
  const sessions = await prisma.session.findMany({
    where: {
      room_id: roomId,
    },
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
  });

  return sessions.map((session) => ({
    ...session,
    is_live: isSessionLive(
      session.start_time,
      session.end_time
    ),
  }));
}

export async function createSession(data) {
  const {
    speaker_ids,
    ...sessionData
  } = data;

  return prisma.session.create({
    data: {
      ...sessionData,

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
  });
}

export async function updateSession(id, data) {
  const {
    speaker_ids,
    ...sessionData
  } = data;

  return prisma.session.update({
    where: { id },

    data: {
      ...sessionData,

      speakers: speaker_ids
        ? {
            deleteMany: {},

            create: speaker_ids.map(
              (speakerId) => ({
                speaker: {
                  connect: {
                    id: speakerId,
                  },
                },
              })
            ),
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
  });
}

export async function deleteSession(id) {
  return prisma.session.delete({
    where: { id },
  });
}