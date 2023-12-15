import { logger, validation } from "../../utils/index.mjs";
import { getAllByLikeNameRepo } from "../../repositories/users/index.mjs";


export const getAllByLikeName = async (req,res) => {
  const name = req.params.name

  try {
    
    if (validation.isRequired({ name }, ["name"]))
    return res.status(400).json({ error: validation.isRequired({ name }, ["name"]) });
  
    const result = await getAllByLikeNameRepo(name);

    if(result.error) {
      res.status(400).json({ error: result.error})
      return
    }

    res.status(200).json(result);
  } catch (error) {
    logger.err("getAllByLikeName users", "error when searching for user", error);
  }
} 