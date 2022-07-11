import { Router } from "express";
import * as ExamGroup from "../../controllers/mysql/ExamGroup.controller.js";

const router = Router();
const url = "/api/exam-group";

router.post(url, ExamGroup.create);

router.get(url, ExamGroup.getAll);

router.patch(`${url}/:id`, ExamGroup.updateById);

router.delete(`${url}/:id`, ExamGroup.remove);

export default router;
