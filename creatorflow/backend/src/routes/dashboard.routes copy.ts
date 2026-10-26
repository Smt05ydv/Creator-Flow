import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { dashboard,upcoming,recentPayments,
}
  from "../controllers/dashboard.controller.js";

 const router = Router();

 router.route("/").get(verifyJWT,dashboard)

 router.route("/upcoming").get(verifyJWT,upcoming)

 router.route("/recent-payments").get(verifyJWT,recentPayments)

 export default router;