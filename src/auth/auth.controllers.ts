import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ExistObjectError, InvalidError } from "../errors";
import ResponseJson from "../types/responseJson.types";
import { UploadImage } from "../utils";
import authMapper from "./auth.mapper";
import authRepo from "./auth.repository";
import authServices from "./auth.services";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RefreshTokenSchema,
  RegisterSchema,
  ResetPasswordSchema,
  UpdateUserSchema,
  VerifyUserSchema,
} from "./schema/auth.schema";

// TODO: create services for register,update,delete account user
class AuthController {
  public async loginHandler(
    req: Request<{}, {}, LoginSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { email, password } = req.body;

    try {
      const user = await authRepo.getUserByEmail(email);

      await authServices.sendVerificationCode(user);

      await authServices.validatePassowrd(password, user);

      const accessToken = await authServices.createAccessToken(user.userId);
      const refreshToken = await authServices.createRefreshToken(user.userId);

      return res.status(200).json({
        success: true,
        statusCode: 200,

        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async RegisterHandler(
    req: Request<{}, {}, RegisterSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const avatarFile = req.file;

    try {
      if (avatarFile) {
        const upload = new UploadImage(avatarFile);
        const user = await authRepo.createUser(req.body, upload.uniqImageName);
        upload.saveToStorage();
        await authServices.sendVerificationCode(user);
      }
      const user = await authRepo.createUser(req.body);
      await authServices.sendVerificationCode(user);

      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Verification code sent to email",
      });
    } catch (error) {
      if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
      ) {
        return next(
          new ExistObjectError("َUser already exist with this email.")
        );
      }
      next(error);
    }
  }

  public async profileHandler(
    req: Request,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    try {
      const user = authServices.checkUserUndefined(req.user);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: authMapper.toDispaly(user),
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateUserHandler(
    req: Request<{}, {}, UpdateUserSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const avatarFile = req.file;
    const user = authServices.checkUserUndefined(req.user);
    try {
      if (avatarFile) {
        const upload = new UploadImage(avatarFile);
        const updatedUser = await authRepo.updateUserById(
          user.userId,
          req.body,
          upload.uniqImageName
        );

        if (updatedUser.avatar || updatedUser.avatar === null) {
          UploadImage.deleteFromStorage(updatedUser.avatar);
          upload.saveToStorage();
        }
      } else {
        const updatedUser = await authRepo.updateUserById(
          user.userId,
          req.body
        );

        if (updatedUser.avatar) {
          UploadImage.deleteFromStorage(updatedUser.avatar);
        }
      }

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Your profile is updated.",
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUserHandler(
    req: Request,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    try {
      const user = authServices.checkUserUndefined(req.user);

      await authRepo.deleteUserById(user.id);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Your account is deleted.",
      });
    } catch (error) {
      next(error);
    }
  }

  public async verifyUserHandler(
    req: Request<VerifyUserSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { id, verifyCode } = req.params;

    try {
      const user = await authRepo.getUserById(id);

      authServices.isExpiredLink(user.verificationCode.expireAt);

      const isVerifiedUser = await authServices.isVerified(verifyCode, user);
      if (isVerifiedUser) {
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Your account succussfully verified.",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  public async forgotPasswordUserHandler(
    req: Request<{}, {}, ForgotPasswordSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { email } = req.body;

    try {
      const user = await authRepo.getUserByEmail(email);

      await authServices.sendForgotPasswordCode(user);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Forgot password link sent to email.",
      });
    } catch (err) {
      next(err);
    }
  }

  public async resetPasswordUserHandler(
    req: Request<
      ResetPasswordSchema["params"],
      {},
      ResetPasswordSchema["body"]
    >,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;

    try {
      const user = await authRepo.getUserById(id);

      authServices.isExpiredLink(user.passwordResetCode.expireAt);

      await authServices.resetPassword(user, passwordResetCode, password);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Your password successfully changed.",
      });
    } catch (err) {
      next(err);
    }
  }

  public async refreshTokenHandler(
    req: Request<{}, {}, RefreshTokenSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { refreshToken } = req.body;

    try {
      if (!refreshToken) {
        throw new InvalidError("Invalid refresh token.");
      }
      const { id } = await authServices.verifyRefreshToken(refreshToken);

      const accessToken = await authServices.createAccessToken(id);

      res.json({
        success: true,
        statusCode: 200,
        message: "Refresh token is created.",
        data: { accessToken: accessToken },
      });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
