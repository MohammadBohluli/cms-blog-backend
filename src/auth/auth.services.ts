import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import {
  ExistObjectError,
  ExpiredError,
  InvalidError,
  NotAuthenticatedError,
  NotFoundError,
} from "../errors";
import { UserDocument } from "../types/user.types";
import {
  generateExpireTime,
  generateRandomCode,
  isDefined,
  sendMail,
} from "../utils";

class AuthServices {
  public async sendVerificationCode(user: UserDocument): Promise<void> {
    if (!user.verified) {
      user.verificationCode.code = generateRandomCode();
      user.verificationCode.expireAt = generateExpireTime(10);
      user.save();

      await sendMail({
        from: "test@example.com",
        to: user.email,
        subject: "Verify link",
        text: `Verification code: http://localhost:3000/api/auth/verify/${user.userId}/${user.verificationCode.code}`,
      });

      throw new NotAuthenticatedError(
        "Your account not verified. verification link sent to the email that you with registered. Plaese check your email."
      );
    }
  }

  public async isVerified(
    verifyCode: string,
    user: UserDocument
  ): Promise<boolean> {
    if (user.verified) throw new ExistObjectError("User already verified");

    if (user.verificationCode.code === verifyCode) {
      user.verified = true;
      user.verificationCode.code = null;
      user.verificationCode.expireAt = null;
      user.save();
      return true;
    }

    throw new NotAuthenticatedError("Your account is not verified.");
  }

  public async sendForgotPasswordCode(user: UserDocument): Promise<void> {
    user.passwordResetCode.code = generateRandomCode();
    user.passwordResetCode.expireAt = generateExpireTime(10);
    user.save();

    await sendMail({
      from: "test@example.com",
      to: user.email,
      subject: "Forgot password",
      text: `Password reset code: http://localhost:3000/api/auth/resetPassword/${user.userId}/${user.passwordResetCode.code}`,
    });
  }

  public async resetPassword(
    user: UserDocument,
    passwordResetCode: string,
    password: string
  ): Promise<void> {
    if (
      !user.passwordResetCode.code ||
      user.passwordResetCode.code !== passwordResetCode
    ) {
      throw new InvalidError("Invalid token. Can not change the password.");
    }
    user.password = password;
    user.passwordResetCode.code = null;
    user.passwordResetCode.expireAt = null;
    user.save();
  }

  public isExpiredLink(expireTime: Date | null): boolean {
    const currentTime = new Date().getTime();
    if (expireTime != null && currentTime < expireTime.getTime()) {
      return true;
    }
    throw new ExpiredError("Verify link is expired. Please try again");
  }

  public async validatePassowrd(password: string, user: UserDocument) {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new InvalidError("Invalid password.");
  }

  public createAccessToken(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const signingKey = config.get<string>("accessTokenSecretKey");
      const payload: object = {
        id: userId,
      };

      const option: jwt.SignOptions = {
        algorithm: "HS256",
        expiresIn: "120 minutes",
      };
      return jwt.sign(payload, signingKey, option, (error, token) => {
        if (error) {
          reject(error);
        } else if (token) {
          resolve(token);
        } else {
          reject(new Error("Token generation failed"));
        }
      });
    });
  }

  public createRefreshToken(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const signingKey = config.get<string>("refreshTokenSecretKey");
      const payload: object = {
        id: userId,
      };

      const option: jwt.SignOptions = {
        algorithm: "HS256",
        expiresIn: "360 minutes",
      };
      return jwt.sign(payload, signingKey, option, (error, token) => {
        if (error) {
          reject(new Error(error.message));
        } else if (token) {
          resolve(token);
        } else {
          reject(new Error("Token generation failed"));
        }
      });
    });
  }

  public verifyAccessToken(token: string): Promise<{ id: string }> {
    return new Promise((resolve, reject) => {
      const signingKey = config.get<string>("accessTokenSecretKey");

      return jwt.verify(token, signingKey, (error, payload) => {
        if (error) {
          if (error instanceof jwt.TokenExpiredError) {
            reject(new ExpiredError());
          } else {
            reject(new InvalidError("Token is not valid."));
          }
        }
        if (payload !== undefined) {
          const userId = payload as { id: string };

          resolve(userId);
        }
        reject(new Error("Token generation failed"));
      });
    });
  }

  public verifyRefreshToken(token: string): Promise<{ id: string }> {
    return new Promise((resolve, reject) => {
      const signingKey = config.get<string>("refreshTokenSecretKey");

      return jwt.verify(token, signingKey, (error, payload) => {
        if (error) {
          if (error instanceof jwt.TokenExpiredError) {
            reject(new ExpiredError());
          } else {
            reject(new InvalidError("Token is not valid."));
          }
        }
        if (payload !== undefined) {
          const userId = payload as { id: string };
          resolve(userId);
        }
        reject(new Error("Payload is undefined"));
      });
    });
  }

  public checkUserUndefined(user: UserDocument | undefined): UserDocument {
    if (isDefined<UserDocument>(user)) {
      return user;
    }
    throw new NotFoundError("User not found");
  }
}

const authServices = new AuthServices();
export default authServices;
