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

export async function createEvent(data) {
  return prisma.event.create({
    data: {
      title: data.title,
      description:
        data.description,
      start_date: new Date(data.start_date), 
      end_date: new Date(data.end_date),
      location: data.location,
    },
  });
}

export async function updateEvent(
  id,
  data
) {
  return prisma.event.update({
    where: {
      id,
    },

    data: {
      title: data.title,
      description:
        data.description,
      start_date:
        data.start_date,
      end_date:
        data.end_date,
      location: data.location,
    },
  });
}

export async function getEventById(id) {
  return prisma.event.findUnique({
    where: {
      id,
    },

    include: {
      sessions: {
        include: {
          room: true,

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