import { prisma } from "../config/db.js";

export async function getStatistics() {
    const [
        events,
        sessions,
        rooms,
        speakers,
        questions,
    ] = await Promise.all([
        prisma.event.count(),
        prisma.session.count(),
        prisma.room.count(),
        prisma.user.count({
            where: {
                role: "speaker",
            },
        }),
        prisma.question.count(),
    ]);

    return {
        events,
        sessions,
        rooms,
        speakers,
        questions,
    };
}