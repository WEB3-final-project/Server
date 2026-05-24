import { Router } from "express";

import * as questionController from "../controllers/question.controllers.js";

const router = Router();

router.get(
  "/session/:sessionId",
  questionController.getQuestions
);

router.post(
  "/",
  questionController.createQuestion
);

router.patch(
  "/:id/upvote",
  questionController.upvoteQuestion
);

router.delete(
  "/:id",
  questionController.deleteQuestion
);

export default router;