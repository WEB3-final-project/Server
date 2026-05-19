import { prisma } from "../config/db.js";

export const findEventById = async (id) => {
  return await prisma.event.findUnique({
    where: { id },

    include: {
      sessions: {
        include: {
          room: true,

          speakers: {
            include: {
              speaker: {
                select: {
                  id: true,
                  full_name: true,
                  photo_url: true,
                },
              },
            },
          },
        },

        orderBy: {
          start_time: "asc",
        },
      },
    },
  });
};

export const findAllEvents = async () => {
  return await prisma.event.findMany({
    orderBy: {
      start_date: "asc",
    },
  });
};