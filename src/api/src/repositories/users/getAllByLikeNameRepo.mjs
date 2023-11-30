import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const getAllByLikeNameRepo = async (nome) => {
  const db = await databasePromise;

  try {
    const userExists = await db.all(
      "SELECT nome, imagem, email, data_nascimento, autorizacao FROM users WHERE nome LIKE ?",
      [nome + '%']
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
