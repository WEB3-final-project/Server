import { prisma } from "../config/db.js";
export const isExist = async (id) => {
    const eventExists = await prisma.event.findUnique({
        where: { id }
    });
    if (!eventExists) {
        throw new Error(JSON.stringify({ status: 404, message: "event doesn't exist" }));
    }
}