import { logger, validation } from "../../utils/index.mjs";
import { addRepo } from "../../repositories/users/index.mjs";

export const add = async (req, res) => {
  const body = req.body;

  if (validation.isRequired(body, ["name", "image", "email", "password", "birthDate", "permission"]))
    return res.status(400).json({ error: validation.isRequired(body, ["name", "image", "email", "password", "birthDate", "permission"]) });

  try {
    const result = await addRepo(body);

    if(result.error) {
      res.status(400).json({ error: result.error})
      return
    }

    res.status(201).json(result);
  } catch (error) {
    logger.err("add users", "error when inserting a new user", error);
  }
};
