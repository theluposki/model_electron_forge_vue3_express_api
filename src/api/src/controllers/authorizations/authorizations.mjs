import { logger } from "../../utils/index.mjs";
import config from "../../config.mjs";

export const authorizations = async (req,res) => {
  try {
    console.log("authorizationsList: ", config.authorizationsList)
    res.status(200).json(config.authorizationsList);
  } catch (error) {
    logger.err("authorizationsList", "error listing authorizations", error);
  }
} 