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

export async function getAllSpeakersService() {
  return await prisma.user.findMany({
    where: {
      role: 'speaker',
      deleted_at: null
    },
    select: {
      id: true,
      email: true,
      full_name: true,
      bio: true,
      photo_url: true,
      external_links: true,
      created_at: true,
      session_speakers: {
        include: {
          session: true 
        }
      }
    },
    orderBy: {
      full_name: 'asc'
    }
  });
}