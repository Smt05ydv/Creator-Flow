import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";


import { addPromotion, deletePromotion, editPromotion, getAllPromotions, getCurrentPromotion } from "../controllers/promotion.controller.js";

const router= Router();

router.route("/addPromotion").post(verifyJWT,addPromotion);
router.route("/").get(verifyJWT,getAllPromotions);
router.get("/test-get", (req, res) => {
    res.send("GET ROUTE WORKS");
});

router.route("/:id").get(verifyJWT,getCurrentPromotion);
router.route("/:id").put(verifyJWT,editPromotion);
router.route("/:id").delete(verifyJWT,deletePromotion);


export default router;