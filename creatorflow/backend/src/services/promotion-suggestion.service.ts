
import mongoose from "mongoose";
import { PromotionSuggestion } from "../models/promotionSuggestion.js";
import { ApiError } from "../utils/api-error.js";
import { aiExtraction } from "./Ai-extraction.service.js";

const STALE_PROCESSING_MS = 10 * 60 * 1000; 

export const processPromotionSuggestion = async (
    suggestionId: string
) => {
    if (!mongoose.isValidObjectId(suggestionId)) {
        throw new ApiError(400, "Invalid suggestion ID");
    }
    const now= new Date();
    const staleBefore=  new Date(now.getTime()-STALE_PROCESSING_MS)

   const suggestion = await PromotionSuggestion.findOneAndUpdate(
    {
        _id: suggestionId,
        $or:[

             { processingStatus: "RECEIVED" },
      {
        processingStatus: "FAILED",
        retryCount: { $lt: 3 },
      },
            {processingStatus:"PROCESSING",
                processingStartedAt:{$lt:staleBefore},

            },
            {
                    processingStatus: "PROCESSING",
                    processingStartedAt: null,
                },
        ]
    },
    {
        $set: {
            processingStatus: "PROCESSING",
             processingStartedAt:now,
            lastError: null,
        },
    },
    {
        new: true,
    }
);

if (!suggestion) {
    const existing = await PromotionSuggestion.findById(suggestionId);

    if (!existing) {
        throw new ApiError(404, "Promotion suggestion not found");
    }

    if (existing.processingStatus === "COMPLETED") {
        return existing;
    }

    throw new ApiError(409, "Suggestion is already being processed");
}
    

    try {
        // Temporary simulation. AI extraction will replace this later.
        await aiExtraction(suggestionId)
        const updatedSuggestion= await PromotionSuggestion.findById(suggestionId)

          if (!updatedSuggestion) {
            throw new ApiError(
                404,
                "Promotion suggestion not found after processing"
            );
        }
       
        return updatedSuggestion;
    }  catch (error: unknown) {
    const errorMessage =
        error instanceof Error
            ? error.message.slice(0, 500)
            : "Unknown processing error";

    try {
        await PromotionSuggestion.findByIdAndUpdate(
            suggestionId,
            {
                $inc: { retryCount: 1 },
                $set: {
                    processingStatus: "FAILED",
                    processingStartedAt: null,
                    lastError: errorMessage,
                },
            }
        );
    } catch (dbError: unknown) {
        // Log the failure to update MongoDB.
        console.error(
            "Failed to update suggestion failure status:",
            dbError
        );
    }

    // Preserve and rethrow the original extraction error.
    throw error;
}
    
};

