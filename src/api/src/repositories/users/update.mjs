import { databasePromise } from "../../database/index.mjs";
import { logger, hashPassword } from "../../utils/index.mjs";

export const updateRepo = async (id, body) => {
  const { name, image, email, password, birthDate, permission } = body;

  const db = await databasePromise;

  try {
    const userExists = await db.get("SELECT id FROM users WHERE id = ?", [id]);

    if (!userExists) return { error: "User not found." };

    const birthDateInMilliseconds = new Date(birthDate).getTime();
    const hashPasswordText = await hashPassword.hash(password);

    const query = `UPDATE users
    SET name = ?, image = ?, email = ?, password = ?, birthDate = ?, permission = ? 
    WHERE id = ?
    `;

    const row = await db.run(query, [
      name,
      image,
      email,
      hashPasswordText,
      birthDateInMilliseconds,
      permission,
      id
    ]);

    if (row.changes === 1) {
      return { message: "Atualizado com sucesso!" };
    }
  } catch (error) {
    logger.err("update repo user", "Unable to update user.", error);
    return { error: "Unable to update user." };
  }
};
