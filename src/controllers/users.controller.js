import { updateUserPhoto } from "../services/users.services.js"

export const uploadPhoto = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await updateUserPhoto(userId, req.file);

    return res.status(200).json({
      message: "Photo updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return handleError(res, error, "Error uploading photo");
  }
};