import { getSpeakerByIdService, getAllSpeakersService } from "../services/speakers.services.js";
import { SpeakerPageDTO } from "../dto/speaker.dto.js";
import "dotenv/config";
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

    return res.status(200).json({ speaker: speakerDTO });
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
