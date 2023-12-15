import { randomUUID } from "node:crypto";
import { databasePromise } from "../../database/index.mjs";
import { logger } from "../../utils/index.mjs";

export const AddPermissionRepo = async (body) => {
  const id = randomUUID();

  const { permission, bgColor, colorFont, authorizations } = body;

  const db = await databasePromise;

  try {
    const existingPermission = await db.get(
      "SELECT * FROM permissions WHERE permission = ?",
      [permission]
    );

    if (existingPermission) {
      return { error: "existing permission." };
    }

    const query = `INSERT INTO permissions (id, permission,  bgColor, colorFont, authorizations) VALUES (?, ?, ?, ?, ?);`;

    const row = await db.run(query, [
      id,
      permission,
      bgColor,
      colorFont,
      JSON.stringify(authorizations) 
    ]);

    if (row.changes === 1) {
      return { message: "Registrada com sucesso!" };
    }
  } catch (error) {
    logger.err("AddPermissionRepo", "Unable to add permission.", error);
    return { error: "Unable to add permission." };
  }
};
