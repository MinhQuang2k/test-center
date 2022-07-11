import { Router } from 'express'
const router = Router()
import * as Question from '../../controllers/mongo/question.controller.js'
import * as TestCase from '../../controllers/test_case/testCase.controller.js'
const url = '/api/questions/'

router.route(url).get(Question.getAll).post(Question.create)
router
  .route(`${url}:id`)
  .get(Question.getById)
  .put(Question.updateById)
  .delete(Question.deleteById)
router.route(`${url}generate-code`).post(TestCase.generateCode)
router.route(`${url}:id/test-code-python`).post(Question.testCode)
export default router
