import { Router } from "express";
import { authenticated, validateSchema } from "../middlewares";
import authController from "./auth.controllers";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  updateUserSchema,
  verifyUserSchema,
} from "./schema/auth.schema";

const router = Router();

router.post("/login", validateSchema(loginSchema), authController.loginHandler);

router.post(
  "/register",
  validateSchema(registerSchema),
  authController.RegisterHandler
);

router.post(
  "/verify/:id/:verifyCode",
  validateSchema(verifyUserSchema),
  authController.verifyUserHandler
);

router.post(
  "/forgotPassword/",
  validateSchema(forgotPasswordSchema),
  authController.forgotPasswordUserHandler
);

router.post(
  "/resetPassword/:id/:passwordResetCode",
  validateSchema(resetPasswordSchema),
  authController.resetPasswordUserHandler
);

router.post(
  "/refreshToken",
  validateSchema(refreshTokenSchema),
  authController.refreshTokenHandler
);

router.post("/me", authenticated, authController.profileHandler);

router.patch(
  "/me",
  [authenticated, validateSchema(updateUserSchema)],
  authController.updateUserHandler
);

router.delete("/me", authenticated, authController.deleteUserHandler);

export default router;
