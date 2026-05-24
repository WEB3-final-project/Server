import * as roomService from "../services/room.services.js";

export async function getRooms(req, res, next) {
  try {
    const rooms =
      await roomService.getAllRooms();

    res.json(rooms);
  } catch (error) {
    next(error);
  }
}

export async function getRoom(req, res, next) {
  try {
    const room =
      await roomService.getRoomById(
        req.params.id
      );

    res.json(room);
  } catch (error) {
    next(error);
  }
}

export async function createRoom(req, res, next) {
  try {
    const room =
      await roomService.createRoom(req.body);

    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
}

export async function updateRoom(req, res, next) {
  try {
    const room =
      await roomService.updateRoom(
        req.params.id,
        req.body
      );

    res.json(room);
  } catch (error) {
    next(error);
  }
}

export async function deleteRoom(req, res, next) {
  try {
    await roomService.deleteRoom(
      req.params.id
    );

    res.json({
      message: "Room deleted",
    });
  } catch (error) {
    next(error);
  }
}