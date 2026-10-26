import { Router } from "express";

import { registerUser,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPasswordRequest,
  changeCurrentPassword,
  resetForgotPassword,
  genrateInboundEmailAddress,
  createSuggestedPromotion,
  googleLogin,
  rejectPromotionSuggestion,
  acceptPromotionSuggestion,
  reviewPromotionSuggestion,} from "../controllers/auth.controller.js"

  import { validate } from "../middlewares/validator.middleware.js";
  import { userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  googleLoginValidator,
  inboundEmailValidator,
  
  } from "../validators/index.js"
  import { testProcessSuggestion,testAIExtraction,getPromotionSuggestions
    ,getPromotionSuggestionById
  } from "../controllers/auth.controller.js";

  import { verifyJWT } from "../middlewares/auth.middleware.js";


  const router= Router();

  router.route("/register").post(userRegisterValidator(),validate,registerUser)
  router.route("/login").post(userLoginValidator(),validate,login)
  router.route("/create-suggestion").post(inboundEmailValidator(),validate,createSuggestedPromotion)
  router.route("/google").post(googleLoginValidator(),validate,googleLogin)
  router
    .route("/test-process")
    .post(verifyJWT, testProcessSuggestion);
    router.post("/test-ai-extraction", verifyJWT, testAIExtraction);
    router
    .route("/suggestions")
    .get(verifyJWT, getPromotionSuggestions);
    router
    .route("/suggestions/:suggestionId/accept")
    .post(verifyJWT, acceptPromotionSuggestion);

router
    .route("/suggestions/:suggestionId/reject")
    .post(verifyJWT, rejectPromotionSuggestion);

router
    .route("/suggestions/:suggestionId")
    .get(verifyJWT, getPromotionSuggestionById);

  router.route("/verify-email/:verificationToken").get(verifyEmail)
  router.route("/refresh-token").post(refreshAccessToken)
  router.route("/forgot-password").
  post(userForgotPasswordValidator(),validate,forgotPasswordRequest)
  router.route("/reset-password/:resetToken").
  post(userResetForgotPasswordValidator(),validate,resetForgotPassword)
router
    .route("/suggestions/:suggestionId/review")
    .patch(verifyJWT, reviewPromotionSuggestion);

  router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);
  router
  .route("/generate-email-address")
  .post(verifyJWT,genrateInboundEmailAddress);
  

export default router;




