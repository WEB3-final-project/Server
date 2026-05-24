import {
  findAllEvents,
  findEventById,
  createEvent,
  updateEvent,
} from "../services/events.services.js";

import {
  EventDTO,
  EventSummaryDTO,
} from "../dto/event.dto.js";

export const getEventById = async (req, res) => {
  const { id } = req.params;

  const event = await findEventById(id);

  if (!event) {
    return res.status(404).json({
      message: "Event not found.",
    });
  }

  return res.status(200).json(
    new EventDTO(event)
  );
};

export const getAllEvents = async (req, res) => {
  const events = await findAllEvents();

  if (events.length === 0) {
    return res.status(404).json({
      message: "No events found.",
    });
  }

  return res.status(200).json(
    events.map(
      (event) => new EventSummaryDTO(event)
    )
  );
};

export async function createNewEvent(
  req,
  res,
  next
) {
  try {
    const event =
      await createEvent(
        req.body
      );

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
}

export async function updateEventById(
  req,
  res,
  next
) {
  try {
    const event =
      await updateEvent(
        req.params.id,
        req.body
      );

    res.json(event);
  } catch (error) {
    next(error);
  }
}

export async function getEvent(
  req,
  res,
  next
) {
  try {
    const event =
      await eventService.getEventById(
        req.params.id
      );

    res.json(event);
  } catch (error) {
    next(error);
  }
}