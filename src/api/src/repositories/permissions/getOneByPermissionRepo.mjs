import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getOneByPermissionRepo = async (permission) => {
  const db = await databasePromise;

  try {
    const existingPermission = await db.get("SELECT * FROM permissions WHERE permission = ?", [permission]);

    if (!existingPermission) return { error: "permission does not exist." };

    return existingPermission;
  } catch (error) {
    logger.err(
      "getOneByPermission repo permissions",
      "Unable to search for this permission.",
      error
    );
    return { error: "Unable to search for this permission." };
  }
};
