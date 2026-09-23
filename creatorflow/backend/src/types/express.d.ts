import type { UserDocument } from "../models/user.models.js";
import type { PromotionDocument } from "../models/promotion.models.ts";
declare global {
    namespace Express {
        interface Request {
            user?: UserDocument;
        }
    }
}

export {};