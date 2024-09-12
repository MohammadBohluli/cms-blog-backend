/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 66bc679f00ef99c82874e4kh
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
 *         role:
 *           type: string
 *           enum:
 *             - published
 *             - draft
 *           example: user
 *         avatar:
 *           type: string
 *           format: binary
 *           example: "http://localhost:3000/images/0843d5c7-Logo.jpg"
 *         createdAt:
 *           type: string
 *           format: date
 *           example: "2024-08-07T20:40:28.356Z"
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: "2024-08-07T23:40:28.356Z"
 */
