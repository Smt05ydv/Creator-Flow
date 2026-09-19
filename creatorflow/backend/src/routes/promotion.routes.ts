import { Router } from "express";

import { addPromotion, deletePromotion, editPromotion, getAllPromotions, getCurrentPromotion } from "../controllers/promotion.controller.js";

const router= Router();

router.route("/addPromotion").post(addPromotion);
router.route("/").get(getAllPromotions);
router.get("/test-get", (req, res) => {
    res.send("GET ROUTE WORKS");
});

router.route("/:id").get(getCurrentPromotion);
router.route("/:id").put(editPromotion);
router.route("/:id").delete(deletePromotion);


export default router;