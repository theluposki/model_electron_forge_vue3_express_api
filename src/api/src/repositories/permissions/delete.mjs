import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const deletePermissionsRepo = async (id) => {
  const db = await databasePromise;

  try {
    const existingPermission = await db.get("SELECT id FROM permissions WHERE id = ?", [id]);

    if (!existingPermission) return { error: "permission does not exist." };

    const query = "DELETE FROM permissions WHERE id = ?";

    const row = await db.run(query, [id]);

    if (row.changes === 1) {
      return { message: "Deletada com sucesso!" };
    }
  } catch (error) {
    logger.err("deletePermissionsRepo", "Unable to delete permission.", error);
    return { error: "Unable to delete permission." };
  }
};
