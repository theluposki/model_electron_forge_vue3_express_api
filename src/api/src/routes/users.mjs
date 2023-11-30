import { Router } from "express";
import { getAll, add, getOneByID, update, deleteC, updateAuthorizationC, my, getAllByLikeName } from "../controllers/users/index.mjs";

const router = Router();

router.get('/', getAll);
router.get('/my', my);
router.get('/:id', getOneByID);
router.get('/search/:nome', getAllByLikeName);
router.post('/', add);
router.put('/:id', update);
router.put('/authorization/:id', updateAuthorizationC);
router.delete('/:id', deleteC);

export default router;