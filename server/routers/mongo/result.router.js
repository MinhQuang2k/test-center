import { Router } from "express";
const router = Router();

import * as Result from "../../controllers/mongo/result.controller.js";

router.get("/api/result/", Result.getAll);
router.post("/api/result", Result.create);

export default router;
