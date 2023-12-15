import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getAllByLikeNameRepo = async (name) => {
  const db = await databasePromise;

  try {
    const userExists = await db.all(
      ` 
        SELECT u.id, u.name, u.email, u.image, u.birthDate, p.permission, p.bgColor, p.colorFont
        FROM users u
        JOIN permissions p ON u.permission = p.id
        WHERE u.name LIKE ?;
      `,
      [name + '%']
    );

    if (!userExists) return [];

    return userExists;
  } catch (error) {
    logger.err(
      "getOneByIDRepo repo user",
      "Unable to search for this user.",
      error
    );
    return { error: "Unable to search for this user." };
  }
};
