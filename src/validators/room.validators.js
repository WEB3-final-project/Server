import { prisma } from "../config/db.js";
export const isExist = async (id) => {
    const roomExists = await prisma.room.findUnique({
        where: { id }
    });
    if (!roomExists) {
        throw new Error(JSON.stringify({ status: 404, message: "room doesn't exist" }));
    }
}