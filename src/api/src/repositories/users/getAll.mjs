import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getAllRepo = async () => {
  const db = await databasePromise;

  try {
    const query =
      `
      SELECT u.id, u.name, u.email, u.image, u.birthDate, p.permission, p.bgColor, p.colorFont
      FROM users u
      JOIN permissions p ON u.permission = p.id;
      `;

    const users = await db.all(query);

    return users;
  } catch (error) {
    logger.err("getAll repo user", "Unable to search for users.", error);
    return { error: "Unable to search for users." };
  }
};
