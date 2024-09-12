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
 *                type: object
 *                required:
 *                  - email
 *                  - firstName
 *                  - lastName
 *                  - password
 *                  - passwordConfirm
 *                properties:
 *                  email:
 *                    type: string
 *                    example: example@gmail.com
 *                  firstName:
 *                    type: string
 *                    minLength: 3
 *                    maxLength: 155
 *                    example: john
 *                  lastName:
 *                    type: string
 *                    minLength: 3
 *                    maxLength: 155
 *                    example: smith
 *                  password:
 *                    type: string
 *                    minLength: 8
 *                    format: password
 *                    example: pass1234
 *                  passwordConfirm:
 *                    type: string
 *                    minLength: 8
 *                    format: password
 *                    example: pass1234
 *                  avatar:
 *                    type: string
 *                    format: binary
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
 *                type: object
 *                required:
 *                  - firstName
 *                  - lastName
 *                properties:
 *                  firstName:
 *                    type: string
 *                    minLength: 3
 *                    maxLength: 155
 *                    example: john
 *                  lastName:
 *                    type: string
 *                    minLength: 3
 *                    maxLength: 155
 *                    example: smith
 *                  avatar:
 *                    type: string
 *                    format: binary
 *                    example: "http://localhost:3000/images/0843d5c7-Logo.jpg"
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
 *                type: object
 *                required:
 *                  - currentPassword
 *                  - password
 *                  - passwordConfirm
 *                properties:
 *                  currentPassword:
 *                    type: string
 *                    format: password
 *                    example: pass1234
 *                  password:
 *                    type: string
 *                    format: password
 *                    minLength: 8
 *                    example: pass56789
 *                  passwordConfirm:
 *                    type: string
 *                    format: password
 *                    minLength: 8
 *                    example: pass56789
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
 *                type: object
 *                required:
 *                  - email
 *                properties:
 *                  email:
 *                    type: string
 *                    example: example@gmail.com
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
 *                type: object
 *                required:
 *                  - refreshToken
 *                properties:
 *                  refreshToken:
 *                    type: string
 *                    example: your_refresh_token
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/RefreshTokenResponse'
 */
