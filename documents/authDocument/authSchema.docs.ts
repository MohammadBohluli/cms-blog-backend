/**
 * @swagger
 * components:
 *   schemas:
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *     RegisterUser:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - lastName
 *         - password
 *         - passwordConfirm
 *       properties:
 *         email:
 *           type: string
 *           example: example@gmail.com
 *         firstName:
 *           type: string
 *           minLength: 3
 *           maxLength: 155
 *           example: john
 *         lastName:
 *           type: string
 *           minLength: 3
 *           maxLength: 155
 *           example: smith
 *         password:
 *           type: string
 *           minLength: 8
 *           format: password
 *           example: pass1234
 *         passwordConfirm:
 *           type: string
 *           minLength: 8
 *           format: password
 *           example: pass1234
 *         avatar:
 *           type: string
 *           format: binary
 *
 *
 *
 *
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: example@gmail.com
 *         email:
 *           type: string
 *           example: example@gmail.com
 *         firstName:
 *           type: string
 *           example: john
 *         lastName:
 *           type: string
 *           example: smith
 *         role:
 *           type: string
 *           example: user
 *         avatar:
 *           type: string
 *           example: "http://localhost:3000/images/0843d5c7-Logo.jpg"
 *         createdAt:
 *           type: string
 *           example: "2024-08-07T20:40:28.356Z"
 *         updatedAt:
 *           type: string
 *           example: "2024-08-07T23:40:28.356Z"
 *
 *
 *
 *
 *     UpdateUser:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         firstName:
 *           type: string
 *           minLength: 3
 *           maxLength: 155
 *           example: john
 *         lastName:
 *           type: string
 *           minLength: 3
 *           maxLength: 155
 *           example: smith
 *         avatar:
 *           type: string
 *           format: binary
 *           example: "http://localhost:3000/images/0843d5c7-Logo.jpg"
 *
 *
 *
 *
 *     ChangeUserPassword:
 *       type: object
 *       required:
 *         - currentPassword
 *         - password
 *         - passwordConfirm
 *       properties:
 *         currentPassword:
 *           type: string
 *           format: password
 *           example: pass1234
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           example: pass56789
 *         passwordConfirm:
 *           type: string
 *           format: password
 *           minLength: 8
 *           example: pass56789
 *
 *
 *
 *
 *     ForgotPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: example@gmail.com
 *
 *
 *
 *
 *     RefreshToken:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           example: your_refresh_token
 */
