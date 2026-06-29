import { getStatistics } from "../services/stats.services.js";

export async function getStats(req, res, next) {
    try {
        const stats = await getStatistics();

        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
}