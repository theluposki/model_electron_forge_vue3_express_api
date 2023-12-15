import { logger, validation } from "../../utils/index.mjs";
import { AddPermissionRepo } from "../../repositories/permissions/index.mjs";

export const add = async (req, res) => {
  const body = req.body;
  
  if (validation.isRequired(body, ["permission", "bgColor", "colorFont", "authorizations"]))
    return res.status(400).json({ error: validation.isRequired(body, ["permission", "bgColor", "colorFont", "authorizations"]) });

  try {
    const result = await AddPermissionRepo(body);

    if(result.error) {
      res.status(400).json({ error: result.error})
      return
    }

    res.status(201).json(result);
  } catch (error) {
    logger.err("add permission", "error when inserting a new permission", error);
  }
};
