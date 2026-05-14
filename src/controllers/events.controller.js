import { prisma } from "../config/db.js";
import { EventDTO } from "../dto/event.dto.js";

export const getEventById = async (req, res) => {
  const { id } = req.params;

  const event = await prisma.event.findUnique({
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
        orderBy: { start_time: "asc" },
      },
    },
  });

  if (!event) {
    return res.status(404).json({ message: "Event not found." });
  }

  return res.status(200).json(new EventDTO(event));
};