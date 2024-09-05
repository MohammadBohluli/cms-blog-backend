import { Router } from "express";
import { authenticated, validateSchema } from "../middlewares";
import { multerConfig } from "../utils";
import authController from "./auth.controllers";
import {
  changePasswordSchema,
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
  [multerConfig.single("avatar"), validateSchema(registerSchema)],
  authController.RegisterHandler
);

router.post(
  "/verify/:id/:verifyCode",
  validateSchema(verifyUserSchema),
  authController.verifyUserHandler
);

router.post(
  "/changePassword",
  [authenticated, validateSchema(changePasswordSchema)],
  authController.changePasswordHandler
);

router.post(
  "/forgotPassword/",
  validateSchema(forgotPasswordSchema),
  authController.forgotPasswordUserHandler
);

router.post(
  "/resetPassword/:userId/:passwordResetCode",
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
  [
    authenticated,
    multerConfig.single("avatar"),
    validateSchema(updateUserSchema),
  ],
  authController.updateUserHandler
);

router.delete("/me", authenticated, authController.deleteUserHandler);

export default router;
