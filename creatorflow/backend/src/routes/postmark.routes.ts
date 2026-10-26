import { Router } from "express";

import { postmarkInboundController } from "../controllers/postmark.controller.js"
const router= Router();

router.route("/inbound").post(postmarkInboundController)

export default router;