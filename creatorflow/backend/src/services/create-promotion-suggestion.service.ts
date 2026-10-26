
import { User } from "../models/user.models.js";
import { PromotionSuggestion } from "../models/promotionSuggestion.js";
import { ApiError } from "../utils/api-error.js";

interface CreateSuggestionInput {
  recipient: string;
   mailboxHash: string;
  providerMessageId: string;
  from: string;
  subject?: string;
  textBody?: string;
  receivedAt?: string | Date;
}

export const createPromotionSuggestion = async (
  input: CreateSuggestionInput
) => {
  const mailboxHash = input.mailboxHash.trim();

  const user = await User.findOne({ inboundEmailToken: mailboxHash, });

  if (!user) {
    throw new ApiError(404, "No CreatorFlow user found for this inbound address");
  }

  const existing = await PromotionSuggestion.findOne({
    userId: user._id,
    "inboundEmail.providerMessageId": input.providerMessageId,
  });

  if (existing) {
    return {
      suggestion: existing,
      duplicate: true,
    };
  }

  const receivedAt = input.receivedAt
    ? new Date(input.receivedAt)
    : new Date();

  if (Number.isNaN(receivedAt.getTime())) {
    throw new ApiError(400, "Invalid email received date");
  }

  try {
    const suggestion = await PromotionSuggestion.create({
      userId: user._id,
      promotionStatus: "PENDING",
      processingStatus: "RECEIVED",
      inboundEmail: {
        providerMessageId: input.providerMessageId,
        from: input.from,
        subject: input.subject ?? "",
        textBody: input.textBody ?? "",
        receivedAt,
      },
      parsedEmail: {
        brand: null,
        platform: null,
        amount: null,
        dueDate: null,
        deliverables: [],
        payment: null,
        campaign: null,
      },
    });

    return {
      suggestion,
      duplicate: false,
    };
  } catch (error: unknown) {
    // Handle simultaneous duplicate webhook deliveries.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      const suggestion = await PromotionSuggestion.findOne({
        userId: user._id,
        "inboundEmail.providerMessageId": input.providerMessageId,
      });

      if (suggestion) {
        return {
          suggestion,
          duplicate: true,
        };
      }
    }

    throw error;
  }
};
