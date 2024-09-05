import { NextFunction, Request, Response } from "express";
import { InvalidError } from "../errors";
import ResponseJson from "../types/responseJson.types";
import { HttpStatusCode } from "../utils";
import authMapper from "./auth.mapper";
import authRepo from "./auth.repository";
import authServices from "./auth.services";
import {
  ChangePasswordSchema,
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
      const { accessToken, refreshToken } = await authServices.login(
        email,
        password
      );

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: process.env.REFRESH_TOKEN_LIFETIME,
        })
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: process.env.ACCESS_TOKEN_LIFETIME,
        });

      res.status(200).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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
    const avatarFile = req.file ? req.file : undefined;

    try {
      await authServices.register(req.body, avatarFile);

      return res.status(HttpStatusCode.SUCCESS_CREATED).json({
        statusCode: HttpStatusCode.SUCCESS_CREATED,
        message: "Verification code sent to email",
      });
    } catch (error) {
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

      return res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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
      await authServices.update(user.userId, req.body, avatarFile);

      res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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
      await authServices.delete(user.userId);

      return res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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
        return res.status(HttpStatusCode.SUCCESS_OK).json({
          statusCode: HttpStatusCode.SUCCESS_OK,
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

      return res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
        message: "Forgot password link sent to email.",
      });
    } catch (err) {
      next(err);
    }
  }

  public async changePasswordHandler(
    req: Request<{}, {}, ChangePasswordSchema>,
    res: Response<ResponseJson>,
    next: NextFunction
  ) {
    const { password, currentPassword } = req.body;
    const user = authServices.checkUserUndefined(req.user);

    const isValid = await authServices.validatePassowrd(currentPassword, user);

    try {
      if (!isValid) {
        throw new InvalidError("Current password is not correct");
      }
      user.password = password;
      user.save();

      return res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
        message: "Your password is changed.",
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
    const { userId, passwordResetCode } = req.params;
    const { password } = req.body;

    try {
      const user = await authRepo.getUserById(userId);

      authServices.isExpiredLink(user.passwordResetCode.expireAt);

      await authServices.resetPassword(user, passwordResetCode, password);

      return res.status(HttpStatusCode.SUCCESS_OK).json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: process.env.REFRESH_TOKEN_LIFETIME,
        })
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: process.env.ACCESS_TOKEN_LIFETIME,
        });

      res.json({
        statusCode: HttpStatusCode.SUCCESS_OK,
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
