import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ExistObjectError, InvalidError } from "../errors";
import ResponseJson from "../types/responseJson.types";
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
    try {
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
    try {
      const user = authServices.checkUserUndefined(req.user);

      await authRepo.updateUserById(user.id, req.body);

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
