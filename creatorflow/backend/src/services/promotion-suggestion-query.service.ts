import mongoose from "mongoose";
import { PromotionSuggestion } from "../models/promotionSuggestion.js";
import { ApiError } from "../utils/api-error.js";

export const getUserPromotionSuggestions = async (
    userId: string
) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    return await PromotionSuggestion.find({ userId })
        .select("-inboundEmail.textBody")
        .sort({ createdAt: -1 });
};

export const getUserPromotionSuggestionById = async (
    userId: string,
    suggestionId: string
) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    if (!mongoose.isValidObjectId(suggestionId)) {
        throw new ApiError(400, "Invalid suggestion ID");
    }

    const suggestion = await PromotionSuggestion.findOne({
        _id: suggestionId,
        userId,
    }).select("-inboundEmail.textBody");

    if (!suggestion) {
        throw new ApiError(404, "Promotion suggestion not found");
    }

    return suggestion;
};