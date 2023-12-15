import { logger, validation } from "../../utils/index.mjs";
import { getOneByPermissionRepo } from "../../repositories/permissions/index.mjs";


export const getOneByPermission = async (req,res) => {
  const permission = req.params.permission;
  try {
    
    if (validation.isRequired({ permission }, ["permission"]))
    return res.status(400).json({ error: validation.isRequired({ permission }, ["permission"]) });
  
    const result = await getOneByPermissionRepo(permission);

    if(result.error) {
      res.status(400).json({ error: result.error})
      return
    }

    res.status(200).json(result);
  } catch (error) {
    logger.err("getOneByID permissions", "error when searching for permission", error);
  }
} 