import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getOneByIDRepo = async (id) => {
  const db = await databasePromise;

  try {
    const existingPermission = await db.get("SELECT * FROM permissions WHERE id = ?", [id]);

    if (!existingPermission) return { error: "permission does not exist." };

    return existingPermission;
  } catch (error) {
    logger.err(
      "getOneByID repo permissions",
      "Unable to search for this permission.",
      error
    );
    return { error: "Unable to search for this permission." };
  }
};
