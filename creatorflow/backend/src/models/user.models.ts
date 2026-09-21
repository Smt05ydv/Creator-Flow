import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

export interface IUser {
     avatar?: {
        url?: string;
        localpath?: string;
    };

  username: string;
  email: string;
  password: string;
  fullname?: string;
  isEmailVerified: boolean;
  refreshToken?: string;
  forgotPasswordToken?: string | undefined;
  forgotPasswordExpiry?: Date | undefined;
  emailVerificationToken?: string | undefined;
  emailVerificationExpiry?: Date | undefined;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateTemporaryToken(): {
    unhashedToken: string;
    hashedToken: string;
    tokenExpiry: number;
  };
}

export type UserModel = Model<IUser, {}, IUserMethods>;
export type UserDocument = HydratedDocument<IUser, IUserMethods>;



      


const userSchema= new Schema<IUser, UserModel, IUserMethods>(
    {
        avatar:{
            type:{
                url:String,
                localpath:String,
            },
            default:{
                url:"https://placehold.co/200x200",
                localpath:"",
            },
        },
        username:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            unique:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,

        },

        fullname:{
            type:String,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"password is required"],

        },
        isEmailVerified:{
            type:Boolean,
            default:false,
        },
        
        refreshToken:{
            type:String,
        },
        forgotPasswordToken:{
            type:String,
        },
        forgotPasswordExpiry:{
            type:Date,
        },
        
        emailVerificationToken:{
            type:String,
        },
        emailVerificationExpiry:{
            type:Date,
        },

    },
    {
        timestamps:true,
    },
);



//hash password before save

userSchema.pre("save",async function () {
       if (!this.isModified("password")) {
        return;}

        this.password = await bcrypt.hash(this.password,10)
});


//compare password before saving
userSchema.methods.isPasswordCorrect= async function (password:string) {
    return await bcrypt.compare(password,this.password)
};


userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
          {
            _id:this._id,
            username:this.username,
            email:this.email,

          },
          process.env.ACCESS_TOKEN_SECRET!,
           {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as NonNullable<jwt.SignOptions["expiresIn"]>,
    }
    );
};


userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as NonNullable<jwt.SignOptions["expiresIn"]>,
    },
  );
};


userSchema.methods.generateTemporaryToken= function(){
    const unhashedToken= crypto.randomBytes(20).toString("hex");

    const hashedToken= crypto
                       .createHash("sha256")
                       .update(unhashedToken)
                       .digest("hex");

    const tokenExpiry= Date.now()+ 20*60*1000;

    return{
        unhashedToken,hashedToken,
        tokenExpiry
    };

};





export const User = mongoose.model<IUser, UserModel>(
    "User",
    userSchema
);


