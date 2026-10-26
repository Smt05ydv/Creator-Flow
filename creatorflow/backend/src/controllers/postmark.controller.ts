
import type { Request, Response } from "express";

import { createPromotionSuggestion } from "../services/create-promotion-suggestion.service.js";
import {
  prpZELkorMwhkkpShF5PvT8YnqRCupnLTNG as processSuggestion,
} from "../services/promotion-suggestion.service.js";

export const postmarkInboundController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const email = req.body;

    console.log("Postmark inbound webhook received");
    console.log("Message ID:", email?.MessageID);
    console.log("Subject:", email?.Subject);

    const mailboxHash =
      email?.MailboxHash ||
      email?.ToFull?.[0]?.MailboxHash;

    const recipient =
      email?.OriginalRecipient ||
      email?.ToFull?.[0]?.Email ||
      email?.To;

    const from =
      email?.FromFull?.[0]?.Email ||
      email?.From;

    const providerMessageId = email?.MessageID;
    const subject = email?.Subject || "";
    const textBody = email?.TextBody || "";
    const receivedAt = email?.Date;

    if (
      typeof mailboxHash !== "string" ||
      !mailboxHash.trim() ||
      typeof recipient !== "string" ||
      !recipient.trim() ||
      typeof from !== "string" ||
      !from.trim() ||
      typeof providerMessageId !== "string" ||
      !providerMessageId.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Missing or invalid inbound email fields",
      });
      return;
    }

    console.log("MailboxHash:", mailboxHash);
console.log("Recipient:", recipient);

    const result = await createPromotionSuggestion({
      recipient,
      mailboxHash,
      providerMessageId,
      from,
      subject,
      textBody,
      receivedAt,
    });

    

    console.log(
      result.duplicate
        ? "Duplicate inbound email detected"
        : "Promotion suggestion created",
      result.suggestion._id.toString()
    );

    if (!result.duplicate) {
  const suggestionId = result.suggestion._id.toString();

  void processSuggestion(suggestionId).catch((error: unknown) => {
    console.error(
      "Automatic promotion extraction failed:",
      error instanceof Error ? error.message : error
    );
  });
}

    res.status(200).json({
      success: true,
      message: result.duplicate
        ? "Email already processed"
        : "Promotion suggestion created",
      suggestionId: result.suggestion._id,
    });
  } catch (error: unknown) {
    console.error("Postmark inbound controller error:", error);

    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    res.status(statusCode).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to process inbound email",
    });
  }
};
