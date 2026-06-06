import * as auditLogService from "../services/auditLog.services.js";

export async function getAuditLogs(req, res, next) {
    try {
        const start = Number(req.query._start || 0);
        const end = Number(req.query._end || 10);

        const perPage = end - start;
        const page = Math.floor(start / perPage) + 1;

        const sort = req.query._sort || "created_at";
        const order = (req.query._order || "DESC").toLowerCase();

        const result = await auditLogService.getAuditLogs({
            page,
            perPage,
            sort,
            order,
            filters: req.query,
        });

        res.setHeader("X-Total-Count", result.totalCount);
        res.setHeader(
            "Access-Control-Expose-Headers",
            "X-Total-Count"
        );
        res.json(result.data);
    } catch (error) {
        next(error);
    }
}
export async function getAuditLogById(req, res, next) {
    try {
        const auditLog = await auditLogService.getAuditLogById(
            req.params.id
        );

        if (!auditLog) {
            return res.status(404).json({
                message: "Audit log not found",
            });
        }

        res.json(auditLog);
    } catch (error) {
        next(error);
    }
}

export async function deleteAuditLog(req, res, next) {
    try {
        await auditLogService.deleteAuditLog(
            req.params.id
        );

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}