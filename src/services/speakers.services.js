import { prisma } from "../config/db.js";
import { BadRequestError } from "../utils/error.js";

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

export const createSpeakerService = async (data) => {
  const { email, password, role } = data;

  if (!email) {
    throw new BadRequestError("Email is required");
  }

  if (role && role !== "speaker") {
    throw new BadRequestError("Invalid role for speaker creation");
  }

  if (password) {
    throw new BadRequestError("Speaker cannot have password");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    if (existingUser.deleted_at) {
      return await prisma.user.update({
        where: { email },
        data: {
          deleted_at: null,
          role: "speaker",
          full_name: data.full_name ?? existingUser.full_name,
          bio: data.bio ?? existingUser.bio,
          photo_url: data.photo_url ?? existingUser.photo_url,
          external_links: data.external_links ?? existingUser.external_links
        }
      });
    }

    throw new BadRequestError("Email already exists");
  }

  return await prisma.user.create({
    data: {
      email,
      full_name: data.full_name,
      bio: data.bio,
      photo_url: data.photo_url,
      external_links: data.external_links,
      role: "speaker",
      password: null
    }
  });
};

export const deleteSpeakerByIdService = async (id) => {
  const speaker = await prisma.user.findFirst({
    where: {
      id,
      role: "speaker",
      deleted_at: null
    }
  });

  if (!speaker) {
    return null;
  }

  return await prisma.user.update({
    where: { id },
    data: {
      deleted_at: new Date()
    }
  });
};

export const updateSpeakerByIdService = async (id, data) => {
  const speaker = await prisma.user.findFirst({
    where: {
      id,
      role: "speaker",
      deleted_at: null
    }
  });

  if (!speaker) {
    return null;
  }

  if (data.id !== undefined) {
    throw new BadRequestError("You cannot modify the speaker ID");
  }

  return await prisma.user.update({
    where: { id },
    data
  });
};