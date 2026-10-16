
import mongoose from "mongoose";
import { PromotionSuggestion } from "../models/promotionSuggestion.js";
import { ApiError } from "../utils/api-error.js";

export const processPromotionSuggestion = async (
    suggestionId: string
) => {
    if (!mongoose.isValidObjectId(suggestionId)) {
        throw new ApiError(400, "Invalid suggestion ID");
    }

    const suggestion = await PromotionSuggestion.findById(suggestionId);

    if (!suggestion) {
        throw new ApiError(404, "Promotion suggestion not found");
    }

    if (suggestion.processingStatus === "COMPLETED") {
        return suggestion;
    }

    suggestion.processingStatus = "PROCESSING";
    suggestion.lastError = null;
    await suggestion.save();

    try {
        // Temporary simulation. AI extraction will replace this later.
        if (!suggestion.inboundEmail.textBody.trim()) {
            throw new Error("Email body is empty");
        }

        // Processing succeeded.
        suggestion.processingStatus = "COMPLETED";
        suggestion.lastError = null;

        await suggestion.save();
        return suggestion;
    } catch (error: unknown) {
        suggestion.retryCount += 1;
        suggestion.processingStatus = "FAILED";

        // Store a safe, bounded error message.
        suggestion.lastError =
            error instanceof Error
                ? error.message.slice(0, 500)
                : "Unknown processing error";

        await suggestion.save();
        throw error;
    }
};
