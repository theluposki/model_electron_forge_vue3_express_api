import { logger } from "../../utils/index.mjs";
import { getAllRepo } from "../../repositories/users/index.mjs";

export const getAll = async (req,res) => {
  try {
    const result = await getAllRepo();

    res.status(200).json(result);
  } catch (error) {
    logger.err("get all users", "error when searching for users", error);
  }
} 