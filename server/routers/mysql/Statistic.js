import { Router } from "express"
import * as Statistic from "../../controllers/mysql/Statistic.controller.js"

const router = Router()
const url = "/api/statistic"

router.get(`${url}/answer-sheets`, Statistic.getCandidates)
router.get(`${url}/campaigns`, Statistic.getTestCampaigns)
router.get(`${url}/campaigns/:id`, Statistic.getTestCampaignResult)
router.get(`${url}/tests`, Statistic.getTests)
router.get(`${url}/tests/:id`, Statistic.getTestResults)

export default router
