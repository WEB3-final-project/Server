import { prisma } from "../config/db.js";
export const isExist = async (id) => {
    const questionExists = await prisma.question.findUnique({
        where: {
          id
        },
    });
    if (!questionExists) {
        throw new Error(JSON.stringify({ status: 404, message: "question doesn't exist" }));
    }
}