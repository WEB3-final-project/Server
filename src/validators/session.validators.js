import { prisma } from "../config/db.js";
export const isExist = async (id) => {
    const sessionExists = await prisma.session.findUnique({
        where: { id }
    });
    if (!sessionExists) {
        throw new Error(JSON.stringify({ status: 404, message: "session doesn't exist" }));
    }
}