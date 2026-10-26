import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { earnings,earningsByPlatform
    ,recentPayments
 } from "../controllers/earnings.controller.js";

 const router = Router();

 router.route("/").get(verifyJWT,earnings)

 router.route("/platform").get(verifyJWT,earningsByPlatform)

 router.route("/recent-payments").get(verifyJWT,recentPayments)

 export default router;