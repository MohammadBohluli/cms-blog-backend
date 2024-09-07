/**
 * @swagger
 * components:
 *   response:
 *
 *
 *
 *
 *
 *     LoginUserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *
 *         message:
 *           type: string
 *           example: Successfully login
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: access token key
 *
 *             refreshToken:
 *               type: string
 *               description: Successfully login
 *               example: refresh token key
 *
 *
 *
 *
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 66bc679f00ef88c82874e4kh
 *             email:
 *               type: string
 *               example: example@gmail.com
 *             firstName:
 *               type: string
 *               example: john
 *             lastName:
 *               type: string
 *               example: smith
 *             role:
 *               type: string
 *               enum:
 *                 - user
 *                 - admin
 *               example: user
 *             avatar:
 *               type: string
 *               example: "http://localhost:3000/images/0843d5c7-Logo.jpg"
 *             createdAt:
 *               type: string
 *               example: "2024-08-07T20:40:28.356Z"
 *             updatedAt:
 *               type: string
 *               example: "2024-08-07T23:40:28.356Z"
 *
 *
 *
 *
 *
 *     RegisterUserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Your account is created
 *
 *
 *
 *
 *
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Your profile is updated
 *
 *
 *
 *
 *
 *     DeleteUserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Your account is deleted
 *
 *
 *
 *
 *     VerificationUserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Your account succussfully verified
 *
 *
 *
 *
 *     ChangeUserPasswordResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Your password succussfully changed
 *
 *
 *
 *
 *     ForgotPasswordResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Forgot password link sent to email
 *
 *
 *
 *
 *     ResetPasswordResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Your password successfully changed
 *
 *
 *
 *
 *     RefreshTokenResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *
 *         message:
 *           type: string
 *           example: Refresh token is created
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: access token key
 */
