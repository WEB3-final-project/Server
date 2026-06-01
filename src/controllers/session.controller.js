import * as sessionService from "../services/session.services.js";

export async function getSessions(
  req,
  res,
  next
) {
  try {
    const sessions =
      await sessionService.getAllSessions();

    res.json(sessions);
  } catch (error) {
    next(error);
  }
}

export async function getSession(
  req,
  res,
  next
) {
  try {
    const session =
      await sessionService.getSessionById(
        req.params.id
      );

    res.json(session);
  } catch (error) {
    next(error);
  }
}

export async function getLiveSessions(
  req,
  res,
  next
) {
  try {
    const sessions =
      await sessionService.getLiveSessions();

    res.json(sessions);
  } catch (error) {
    next(error);
  }
}

export async function getSessionsByRoom(
  req,
  res,
  next
) {
  try {
    const sessions =
      await sessionService.getSessionsByRoom(
        req.params.roomId
      );

    res.json(sessions);
  } catch (error) {
    next(error);
  }
}

export async function createSession(
  req,
  res,
  next
) {
  try {
    const session =
      await sessionService.createSession(
        req.body, req.user.role
      );

    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
}

export async function updateSession(
  req,
  res,
  next
) {
  try {
    const session =
      await sessionService.updateSession(
        req.params.id,
        req.body, req.user.role
      );

    res.json(session);
  } catch (error) {
    next(error);
  }
}

export async function deleteSession(
  req,
  res,
  next
) {
  try {
    await sessionService.deleteSession(
      req.params.id, req.user.role
    );

    res.json({
      message: "Session deleted",
    });
  } catch (error) {
    next(error);
  }
}