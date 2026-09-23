

import crypto from "crypto";
import type { CookieOptions } from "express";
import jwt,{type JwtPayload} from "jsonwebtoken";


import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User  } from "../models/user.models.js";





import { emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail } from "../utils/mail.js";


    interface RefreshTokenPayload extends JwtPayload{
        _id:string
    }

    const cookieoptions:CookieOptions= {
        httpOnly:true,
        secure:true,
    }


  




 const generateAccessAndRefreshToken = async(userId:string)=>{
    try {
        const user= await User.findById(userId)
        if(!user){
            throw new ApiError(409,"User not found")
        }
        const accessToken= user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false})
        return {refreshToken,accessToken}
    } catch (error) {
        throw new ApiError
        (500,"Something went wrong while genrerating refresh and access token")
    }
 }  

   const registerUser= asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body

   const existedUser= await User.findOne({
        $or:[{username},{email}] 
    })
    
    if(existedUser){
        throw new ApiError(409,"User already exist",[])
    }

    const user= await User.create({
        username,
        email,
        password,
        isEmailVerified:false,
    })


    const {hashedToken,unhashedToken,tokenExpiry}=  user.generateTemporaryToken();
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry= new Date(tokenExpiry)

    await user.save({validateBeforeSave:false});


    await sendEmail({
        email: user?.email,
        subject:"please verify your email",
        mailgenContent:emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
        )
    });

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering a user")
    }
      
    return res
           .status(200)
           .json(
            new ApiResponse(200,
                {user:createdUser},
                "User registered successfully and verification mail sent to yuor email"
            )
           )

});

const login= asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    if (!email) {
        throw new ApiError(400,"Email is required")
    }

    const user = await User.findOne({email});

    if (!user){
        throw new ApiError(409,"User not found")
    }

    const isPasswordValid= await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400,"password is wrong try again")
    }

    const {refreshToken,accessToken} = await generateAccessAndRefreshToken(user._id.toString());

    const loggedInUser= await User.findById(user._id).
    select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

    const options:CookieOptions= {
        httpOnly:true,
        secure:false,
    };

    return res
           .status(200)
           .cookie("accessToken",accessToken,options)
           .cookie("refreshToken",refreshToken,options)
           .json(
            new ApiResponse(200,{
                user:loggedInUser,
                accessToken,
                refreshToken
            },
        "User loggedin successfully")
           )
});

const logout= asyncHandler(async(req,res)=>{
    if (!req.user) {
        throw new ApiError(
            401,
            "Unauthorized"
        );
    }
    await User.findByIdAndUpdate(
        req.user._id,
       { $set:
        {
            refreshToken:"",
        },
    },
        {
            new:true,
        }
    );

    const options:CookieOptions= {
        httpOnly:true,
        secure:false,
    }

    return res
            .status(200)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(
                new ApiResponse(200,{},"user logged out")

            );

});


const getCurrentUser= asyncHandler(async(req,res)=>{
     if (!req.user) {
            throw new ApiError(
                401,
                "Unauthorized"
            );
        }
    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,req.user ,"Current user fetched successfully"
                )
            );

});

const verifyEmail= asyncHandler(async(req,res)=>{
    const {verificationToken} = req.params

   if (!verificationToken || Array.isArray(verificationToken)) {
    throw new ApiError(400, "Verification token is required");
}

    let hashedToken= crypto
                     .createHash("sha256")
                     .update(verificationToken)
                     .digest("hex")

    const user= await User.findOne({
        emailVerificationToken:hashedToken,
        emailVerificationExpiry:{$gt:new Date()}
    })     
    
      if (!user){
        throw new ApiError(409,"User not found")
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    user.isEmailVerified= true

    await user.save({validateBeforeSave: false})

    return res
           .status(200)
           .json(
            new ApiResponse(200,{
                isEmailVerified:true
            },"Email is verified")
           )
});


const resendEmailVerification= asyncHandler(async(req,res)=>{
    const user= await  User.findById(req.user?._id)

    if (!user){
        throw new ApiError(409,"User not found")
    }
    if (user.isEmailVerified){
         throw new ApiError(409,"Email already verified")
    }

      const {hashedToken,unhashedToken,tokenExpiry}=  user.generateTemporaryToken();
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry= new Date(tokenExpiry)

    await user.save({validateBeforeSave:false});


    await sendEmail({
        email: user?.email,
        subject:"please verify your email",
        mailgenContent:emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
        )
    });
      return res
           .status(200)
           .json(
            new ApiResponse(200,
                {},
                "verification mail sent to yuor email"
            )
           )


});

const refreshAccessToken = asyncHandler(async(req,res)=>{
  const incomingRefreshToken =
  req.body?.refreshToken || req.cookies?.refreshToken;
    if (!incomingRefreshToken){
        throw new ApiError(409,"refresh token not found")
    }

    try {
        const decodedToken= jwt.verify
        (incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;

            const user = await User.findById(decodedToken._id)
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token in expired");
    }

    const options = {
      httpOnly: true,
      secure: false,
    };

const {accessToken,refreshToken: newRefreshToken}=
await generateAccessAndRefreshToken(user.id.toString());
 user.refreshToken=newRefreshToken
 await user.save();

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed",
        ),
      );


    } catch (error) {
         throw new ApiError(401, "Invalid refresh token");
    }

});


const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = new Date(tokenExpiry);

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unhashedToken}`,
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id",
      ),
    );
});
const resetForgotPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  if (!resetToken || Array.isArray(resetToken)) {
    throw new ApiError(400, "Reset token is required");
}

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: new Date(), },
  });

  if (!user) {
    throw new ApiError(400, "Token is invalid or expired");
  }

  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(
        404,
        "User not found"
    );
}

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  registerUser,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPasswordRequest,
  changeCurrentPassword,
  resetForgotPassword,
};




