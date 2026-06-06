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

export async function createEvent(data, userRole) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
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
  data,
  userRole
) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  return prisma.event.update({
    where: {
      id,
    },

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
export async function deleteEventService(id, userRole) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  const eventExists = await prisma.event.findUnique({
    where: { id }
  });

  if (!eventExists) {
    const error = new Error("Événement introuvable");
    error.statusCode = 404;
    throw error;
  }
  return await prisma.event.delete({
    where: { id }
  });
}