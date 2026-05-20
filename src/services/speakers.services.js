import { prisma } from "../config/db.js";

export const getSpeakerByIdService = async (id) => {
  return await prisma.user.findFirst({
      where: {
        id,
        role: 'speaker',
        deleted_at: null,
      },
    include: {
      session_speakers: {
        include: {
          session: {
            include: {
              room: true,
              event: true,
            },
          },
        },
      },
    },
  });
};