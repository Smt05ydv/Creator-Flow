import { Router } from "express";

import { addPromotion } from "../controllers/promotion.controller.js";

const router= Router()

router.route("/addPromotion").post(addPromotion);

export default router;