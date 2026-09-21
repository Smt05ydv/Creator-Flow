import type { UserDocument } from "../models/user.models.js";

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument;
        }
    }
}

export {};