import { randomUUID } from "node:crypto";
import { databasePromise } from "../../database/index.mjs";
import { logger, hashPassword, validation } from "../../utils/index.mjs";

export const addRepo = async (body) => {
  const id = randomUUID();

  const { name, image, email, password, birthDate, permission } = body;

  if (validation.isValidAge(birthDate))
    return { error: validation.isValidAge(birthDate) };
  if (validation.isEmail(email))
    return { error: validation.isEmail(email) };
  if (validation.isValidPassword(password))
    return { error: validation.isValidPassword(password) };

  const birthDateInMilliseconds = new Date(birthDate).getTime();
  const hashPasswordText = await hashPassword.hash(password);

  const db = await databasePromise;

  try {
    const userAlreadyExists = await db.get(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    const permissionExists = await db.get(
      "SELECT id FROM permissions WHERE id = ?",
      [permission]
    );

    if (userAlreadyExists) {
      return { error: "User already exists." };
    }

    if (!permissionExists) {
      return { error: "this permission does not exist." };
    }

    const query = `
    INSERT INTO users (id, name, image, email, password, birthDate, permission)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const row = await db.run(query, [
      id,
      name,
      image,
      email,
      hashPasswordText,
      birthDateInMilliseconds,
      permission,
    ]);

    if (row.changes === 1) {
      return { message: "Registrado com sucesso!" };
    }
  } catch (error) {
    logger.err("add repo user", "Unable to register user.", error);
    return { error: "Unable to register user." };
  }
};
