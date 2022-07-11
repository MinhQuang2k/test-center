import {Router} from 'express'
import * as Test from '../../controllers/mysql/Test.controller.js'
const router = Router()
// @route /api/tests
router.route('/').post(Test.create)
                 .get(Test.getAll)

router.route('/:id').get(Test.getById)
                    .put(Test.updateInfo)
                    .delete(Test.deleteById)
router.route('/:id/update-config').put(Test.updateConfig)
export default router