import { logger } from "../../utils/index.mjs";

export const authorizations = async (req,res) => {
  try {
    const authorizationsList = [
      'usuários',
      'permições',
      'produtos'
    ]

    res.status(200).json(authorizationsList);
  } catch (error) {
    logger.err("authorizationsList", "error listing authorizations", error);
  }
} 