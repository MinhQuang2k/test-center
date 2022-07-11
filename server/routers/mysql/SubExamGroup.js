import { Router } from "express";
import * as SubExamGroup from "../../controllers/mysql/SubExamGroup.controller.js";

const router = Router();
const url = "/api/sub-exam-group";

router.post(url, SubExamGroup.create);

router.patch(`${url}/:id/move`, SubExamGroup.move);

router.patch(`${url}/:id`, SubExamGroup.updateById);

router.delete(`${url}/:id`, SubExamGroup.remove);

export default router;
