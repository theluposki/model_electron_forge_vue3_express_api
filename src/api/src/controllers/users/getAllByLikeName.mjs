import { logger, validation } from "../../utils/index.mjs";
import { getAllByLikeNameRepo } from "../../repositories/users/index.mjs";


export const getAllByLikeName = async (req,res) => {
  const nome = req.params.nome

  console.log(nome)
  try {
    
    if (validation.isRequired({ nome }, ["nome"]))
    return res.status(400).json({ error: validation.isRequired({ nome }, ["nome"]) });
  
    const result = await getAllByLikeNameRepo(nome);

    if(result.error) {
      res.status(400).json({ error: result.error})
      return
    }

    res.status(200).json(result);
  } catch (error) {
    logger.err("getAllByLikeName users", "error when searching for user", error);
  }
} 