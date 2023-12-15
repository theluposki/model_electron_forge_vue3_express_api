import { logger, validation } from "../../utils/index.mjs";
import { updateRepo } from "../../repositories/users/index.mjs";

export const update = async (req,res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (validation.isRequired({ id, ...body }, ["id","name", "image", "email", "password", "birthDate", "permission"]))
    return res.status(400).json({ error: validation.isRequired({ id, ...body }, ["id","name", "image", "email", "password", "birthDate", "permission"]) });
  
    const result = await updateRepo(id, body);

    if(result.error) {
      res.status(400).json({ error: result.error})
      return
    }

    res.status(201).json(result);
  } catch (error) {
    logger.err("update users", "error when updating user", error);
  }
} 