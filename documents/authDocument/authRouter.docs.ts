/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login user into the site
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - email
 *                  - password
 *                properties:
 *                  email:
 *                    type: string
 *                    example: example@gmail.com
 *                  password:
 *                    type: string
 *                    format: password
 *                    example: pass1234
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/LoginUserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: Register user to the site
 *     requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/RegisterUserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - auth
 *     summary: Show user information
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/UserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/me:
 *   patch:
 *     tags:
 *       - auth
 *     summary: Update user information
 *     requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/UpdateUserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/me:
 *   delete:
 *     tags:
 *       - auth
 *     summary: Delete user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/DeleteUserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/verify/{id}/{verifyCode}:
 *   post:
 *     tags:
 *       - auth
 *     summary: Verification by send email token
 *     parameters:
 *       - name: id
 *         in: path
 *         description: user ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: verifyCode
 *         in: path
 *         description: verify token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/VerificationUserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/changePassword:
 *   post:
 *     tags:
 *       - auth
 *     summary: Change user passowrd
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ChangeUserPassword'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/ChangeUserPasswordResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     tags:
 *       - auth
 *     summary: Forgot password
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/ForgotPasswordResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/resetPassword/{userId}/{passwordResetCode}:
 *   post:
 *     tags:
 *       - auth
 *     summary: Reset password
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: user ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: passwordResetCode
 *         in: path
 *         description: password reset token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/ResetPasswordResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     tags:
 *       - auth
 *     summary: Refresh token
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/RefreshTokenResponse'
 */
