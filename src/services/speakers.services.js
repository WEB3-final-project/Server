import { prisma } from "../config/db.js";

export const getSpeakerByIdService = async (speakerId) => {
  return await prisma.user.findUnique({
    where: {
      id: speakerId,
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