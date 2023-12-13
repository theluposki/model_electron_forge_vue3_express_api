import { logger, validation } from "../../utils/index.mjs";
import { getOneByIDRepo } from "../../repositories/permissions/index.mjs";


export const getOneByID = async (req,res) => {
  const id = req.params.id;
  try {
    
    if (validation.isRequired({ id }, ["id"]))
    return res.status(400).json({ error: validation.isRequired({ id }, ["id"]) });
  
    const result = await getOneByIDRepo(id);

    if(result.error) {
      res.status(400).json({ error: result.error})
      return
    }

    res.status(200).json(result);
  } catch (error) {
    logger.err("getOneByID permissions", "error when searching for permission", error);
  }
} 