import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getOneByIDRepo = async (id) => {
  const db = await databasePromise;

  try {
    const userExists = await db.get(
      "SELECT nome, imagem, email, data_nascimento, autorizacao, created_at, update_at  FROM users WHERE id = ?",
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
