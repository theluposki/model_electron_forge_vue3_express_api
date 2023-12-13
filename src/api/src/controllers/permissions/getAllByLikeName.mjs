import { logger, validation } from "../../utils/index.mjs";
import { getAllByLikeNameRepo } from "../../repositories/permissions/index.mjs";


export const getAllByLikeName = async (req,res) => {
  const permission = req.params.permission

  try {
    
    if (validation.isRequired({ permission }, ["permission"]))
    return res.status(400).json({ error: validation.isRequired({ permission }, ["permission"]) });
  
    const result = await getAllByLikeNameRepo(permission);

    if(result.error) {
      res.status(400).json({ error: result.error});
      return
    }

    res.status(200).json(result);
  } catch (error) {
    logger.err("getAllByLikeName permissions", "error when searching for permissions", error);
  }
} 