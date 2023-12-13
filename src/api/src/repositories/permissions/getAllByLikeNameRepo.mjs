import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getAllByLikeNameRepo = async (permission) => {
  const db = await databasePromise;

  try {
    const existingPermission = await db.all(
      "SELECT * FROM permissions WHERE permission LIKE ?",
      [permission + '%']
    );

    if (!existingPermission) return [];

    return existingPermission;
  } catch (error) {
    logger.err(
      "getOneByIDRepoLike repo permissions",
      "Unable to search for this permission.",
      error
    );
    return { error: "Unable to search for this permission." };
  }
};
