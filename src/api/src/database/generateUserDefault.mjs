import { databasePromise } from "./index.mjs";
import { imageDefault } from "./imageUserDefault.mjs";
import { hashPassword, logger } from "../utils/index.mjs";


function fn18YearsInMilliseconds() {
  const today = new Date();
  const birthdate = new Date(today);

  birthdate.setFullYear(birthdate.getFullYear() - 18);

  return birthdate.getTime();
}



export const checkAndCreateDefaultUser = async () => {
  const db = await databasePromise;

  try {
    const checkAdministratorQuery = `
      SELECT u.*
      FROM users u
      JOIN permissions p ON u.permission = p.id
      WHERE p.permission = 'administrador';
    `;

    const rows = await db.all(checkAdministratorQuery);

    const password = "MyPassw0rd#2023";

    const hash = await hashPassword.hash(password);

    if (rows.length === 0) {
      const createDefaultUserQuery = `
        INSERT INTO users (id, name, image, email, password, birthDate, permission)
        VALUES (
          'a69f62cf-3ee4-4342-9ec3-8c98fb4da830',
          'Jane Doe',
          ?,
          'janedoe@mail.com',
          ?,
          ?,
          '1ccb3a4b-e430-4bb2-b72d-82f5e9436c59'
        );
      `;

      await db.run(createDefaultUserQuery, [imageDefault, hash, fn18YearsInMilliseconds() ]);
      logger.log(
        "checkAndCreateDefaultUser",
        "Standard user created successfully!"
      );
    } else {
      logger.log(
        "checkAndCreateDefaultUser",
        'There is already a user with "administrador" authorization.'
      );
    }
  } catch (error) {
    logger.err("Erro:", error);
  }
};
