import { prisma } from "../config/db.js";
export async function executeWithAudit({
  userId,
  action,
  entityType,
  entityId,
  operation,
}) {
  let oldData = null;

  if (action !== "create") {
    oldData = await prisma[entityType].findUnique({
      where: { id: entityId },
    });
  }

  const result = await operation();

  await prisma.audit_log.create({
    data: {
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id:
        action === "create"
          ? result.id
          : entityId,
      old_data: oldData,
      new_data:
        action === "delete"
          ? null
          : result,
    },
  });

  return result;
}