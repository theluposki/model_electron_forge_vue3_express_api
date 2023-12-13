import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getAllRepo = async () => {
  const db = await databasePromise;

  try {
    const query =
      "SELECT * FROM permissions";

    const permissions = await db.all(query);

    return permissions;
  } catch (error) {
    logger.err("getAll repo permissions", "Unable to search for permissions.", error);
    return { error: "Unable to search for permissions." };
  }
};
