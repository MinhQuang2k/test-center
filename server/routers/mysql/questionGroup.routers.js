import { Router } from 'express';
import * as QuestionGroup from '../../controllers/mysql/questionGroup.controller.js';

const router = Router();
const url = '/api/question-group';

router.post(url, QuestionGroup.create);

// ?page=&keyword=
router.get(url, QuestionGroup.getAll);

router.patch(`${url}/:id`, QuestionGroup.updateById);

router.delete(`${url}/:id`, QuestionGroup.deleteById);

export default router;
