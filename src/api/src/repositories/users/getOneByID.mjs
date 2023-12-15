import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getOneByIDRepo = async (id) => {
  const db = await databasePromise;

  try {
    const userExists = await db.get(
      `
        SELECT 
        u.name, 
        u.image, 
        u.email, 
        u.birthDate, 
        p.permission,
        u.created_at, 
        u.update_at,
        p.bgColor, 
        p.colorFont 
        FROM users u
        JOIN permissions p ON u.permission = p.id
        WHERE u.id = ?;
      `,
      [id]
    );

    if (!userExists) return { error: "User not found." };

    return userExists;
  } catch (error) {
    logger.err(
      "getOneByID repo user",
      "Unable to search for this user.",
      error
    );
    return { error: "Unable to search for this user." };
  }
};
