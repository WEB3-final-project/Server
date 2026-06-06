import { prisma } from "../config/db.js";
import { isSessionLive } from "../utils/session.utils.js";

export async function getQuestionsBySession(sessionId) {
  return prisma.question.findMany({
    where: {
      session_id: sessionId,
    },

    orderBy: [
      {
        upvotes: "desc",
      },
      {
        created_at: "desc",
      },
    ],
  });
}

export async function createQuestion(data) {
  const session = await prisma.session.findUnique({
    where: {
      id: data.session_id,
    },
  });

  if (!session) {
    throw new Error("Session not found");
  }

  const live = isSessionLive(
    session.start_time,
    session.end_time
  );

  if (!live) {
    throw new Error(
      "Questions are only allowed during live sessions"
    );
  }

  return prisma.question.create({
    data: {
      content: data.content,
      author_name:
        data.author_name || "anonymous",
      session_id: data.session_id,
    },
  });
}

export async function upvoteQuestion(id) {
  return prisma.question.update({
    where: { id: Number(id) },

    data: {
      upvotes: {
        increment: 1,
      },
    },
  });
}

export async function deleteQuestion(id, userRole) {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  return prisma.question.delete({
    where: {
      id: Number(id),
    },
  });
}