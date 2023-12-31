import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const updateRepo = async (id, body) => {
  const { permission, bgColor, colorFont, description, authorizations } = body;

  const db = await databasePromise;

  try {
    const existingPermission = await db.get(
      "SELECT id FROM permissions WHERE id = ?",
      [id]
    );

    if (!existingPermission) return { error: "permission does not exist." };

    const query = `UPDATE permissions
    SET permission = ?, bgColor = ?, colorFont = ?, description = ?, authorizations = ?, update_at = ? 
    WHERE id = ?
    `;

    const row = await db.run(query, [
      permission,
      bgColor,
      colorFont,
      description,
      JSON.stringify(authorizations),
      new Date().getTime(),
      id,
    ]);

    if (row.changes === 1) {
      return { message: "Atualizada com sucesso!" };
    }
  } catch (error) {
    logger.err(
      "update repo permissions",
      "Unable to update permission.",
      error
    );
    return { error: "Unable to update permission." };
  }
};
