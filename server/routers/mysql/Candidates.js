import { Router } from "express"
import * as controller from "../../controllers/mysql/Candidate.controller.js"

const router = Router()
const url = "/api/candidates"

router.delete(`${url}/:id`, controller.deleleCandidates)

export default router
