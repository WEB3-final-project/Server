import * as questionService from "../services/question.services.js";

export async function getQuestions(
  req,
  res,
  next
) {
  try {
    const questions =
      await questionService.getQuestionsBySession(
        req.params.sessionId
      );

    res.json(questions);
  } catch (error) {
    next(error);
  }
}

export async function createQuestion(
  req,
  res,
  next
) {
  try {
    const question =
      await questionService.createQuestion(
        req.body
      );

    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
}

export async function upvoteQuestion(
  req,
  res,
  next
) {
  try {
    const question =
      await questionService.upvoteQuestion(
        req.params.id
      );

    res.json(question);
  } catch (error) {
    next(error);
  }
}

export async function deleteQuestion(
  req,
  res,
  next
) {
  try {
    await questionService.deleteQuestion(
      req.params.id, req.user.role,
      req.user.id
    );

    res.json({
      message: "Question deleted",
    });
  } catch (error) {
    next(error);
  }
}