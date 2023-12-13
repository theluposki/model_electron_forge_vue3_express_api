import { logger } from "../../utils/index.mjs";
import { getAllRepo } from "../../repositories/permissions/index.mjs";

export const getAll = async (req,res) => {
  try {
    const result = await getAllRepo();

    res.status(200).json(result);
  } catch (error) {
    logger.err("get all permissions", "error when searching for permissions", error);
  }
} 