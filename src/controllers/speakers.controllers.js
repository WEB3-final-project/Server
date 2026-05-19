import { getSpeakerByIdService } from "../services/speakers.services.js";
import { SpeakerPageDTO } from "../dto/speaker.dto.js";

export const getSpeakerById = async (req, res) => {
  try {
    const { id } = req.params;

    const speaker = await getSpeakerByIdService(id);

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    const speakerDTO = new SpeakerPageDTO(speaker);

    return res.status(200).json(speakerDTO);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};