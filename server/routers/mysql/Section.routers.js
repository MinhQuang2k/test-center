import { Router } from 'express'
import * as Section from '../../controllers/mysql/Section.controller.js'
const router = Router()

router.route('/').post(Section.create)
router.route('/:id').put(Section.updateById).delete(Section.deleteById)

export default router
