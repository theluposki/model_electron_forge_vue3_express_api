import { databasePromise } from "../database/index.mjs";
import { logger, hashPassword, jwt } from "../utils/index.mjs";

export const authRepo = async (body) => {
  const { email, password } = body;

  const db = await databasePromise;

  try {
    const userExists = await db.get(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email]
    );

    if (!userExists) {
      return { error: "Usuário ou Senha invalidos." };
    }

    if (!(await hashPassword.compare(password, userExists.password))) {
      return { error: "Usuário ou Senha invalidos." };
    }

    const token = jwt.sign(userExists.id);

    return { message: "Autenticado com sucesso!", token };
  } catch (error) {
    logger.err("auth repo", "error when authenticating.", error);
    return { error: "error when authenticating." };
  }
};
