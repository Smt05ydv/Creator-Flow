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
  resetForgotPassword,} from "../controllers/auth.controller.js"

  import { validate } from "../middlewares/validator.middleware.js";
  import { userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  } from "../validators/index.js"

  import { verifyJWT } from "../middlewares/auth.middleware.js";

  const router= Router();

  router.route("/register").post(userRegisterValidator(),validate,registerUser)
  router.route("/login").post(userLoginValidator(),validate,login)
  router.route("/verify-email/:verificationToken").get(verifyEmail)
  router.route("/refresh-token").post(refreshAccessToken)
  router.route("/forgot-password").
  post(userForgotPasswordValidator(),validate,forgotPasswordRequest)
  router.route("/reset-password/:resetToken").
  post(userResetForgotPasswordValidator(),validate,resetForgotPassword)


  router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").get(verifyJWT, getCurrentUser);
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

export default router;




