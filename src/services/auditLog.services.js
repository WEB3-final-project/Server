import "dotenv/config";
import { prisma } from "../config/db.js";

export async function getAuditLogs({
    page = 1,
    perPage = 10,
    sort = "created_at",
    order = "desc",
    filters = {}
}) {
    const skip = (page - 1) * perPage;
    const where = {};

    if (filters.action) {
        where.action = filters.action;
    }

    if (filters.entity_type) {
        where.entity_type = filters.entity_type;
    }

    if (filters.user_full_name) {
        where.user = {
            full_name: {
                contains: filters.user_full_name,
                mode: "insensitive",
            },
        };
    }

    const [logs, totalCount] = await Promise.all([
        prisma.audit_log.findMany({
            where,
            skip,
            take: perPage,
            orderBy: {
                [sort]: order === "asc" ? "asc" : "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    },
                },
            },
        }),
        prisma.audit_log.count({ where }),
    ]);

    return {
        data: logs,
        totalCount,
    };
}

export async function getAuditLogById(id) {
    return prisma.audit_log.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: true,
        },
    });
}

export async function deleteAuditLog(id) {
    return prisma.audit_log.delete({
        where: {
            id: Number(id),
        },
    });
}