import {
  getSpeakerByIdService,
  getAllSpeakersService,
  createSpeakerService,
  updateSpeakerByIdService,
  deleteSpeakerByIdService
} from "../services/speakers.services.js";
import { SpeakerPageDTO } from "../dto/speaker.dto.js";
import "dotenv/config";
import { BadRequestError } from "../utils/error.js";

export const getSpeakerById = async (req, res) => {
  try {
    const { id } = req.params;

    const speaker = await getSpeakerByIdService(id);
    if (!speaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }
    const photoUrl = speaker.photo_url
      ? `${req.protocol}://${req.get("host")}${speaker.photo_url}`
      : null;


    const speakerDTO = new SpeakerPageDTO({
      ...speaker,
      photo_url: photoUrl
    });

    return res.status(200).json(speakerDTO);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export async function getAllSpeakers(req, res) {
  try {
    const speakers = await getAllSpeakersService();

    return res.status(200).json(speakers);

  } catch (error) {
    console.error("Erreur dans getAllSpeakers Controller:", error);

    return res.status(500).json({
      message: "Une erreur interne est survenue lors de la récupération des intervenants."
    });
  }
}

export const createSpeaker = async (req, res) => {
  try {
    const data = req.body;

    const newSpeaker = await createSpeakerService(data);

    const photoUrl = newSpeaker.photo_url
      ? `${req.protocol}://${req.get("host")}${newSpeaker.photo_url}`
      : null;

    const speakerDTO = new SpeakerPageDTO({
      ...newSpeaker,
      photo_url: photoUrl
    });

    return res.status(201).json({
      message: "Speaker created successfully",
      speaker: speakerDTO,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message
    });
  }
};

export const deleteSpeakerById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSpeaker = await deleteSpeakerByIdService(id);

    if (!deletedSpeaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    return res.status(200).json({
      message: "Speaker deleted successfully",
      speaker: deletedSpeaker,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message
    });
  }
};

export const updateSpeakerById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedSpeaker = await updateSpeakerByIdService(id, data);

    if (!updatedSpeaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    const photoUrl = updatedSpeaker.photo_url
      ? `${req.protocol}://${req.get("host")}${updatedSpeaker.photo_url}`
      : null;

    const speakerDTO = new SpeakerPageDTO({
      ...updatedSpeaker,
      photo_url: photoUrl
    });

    return res.status(200).json({
      message: "Speaker updated successfully",
      speaker: speakerDTO,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message
    });
  }
};
