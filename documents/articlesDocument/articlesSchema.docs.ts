/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 66bc679f00ef99c82874e4kh
 *         userId:
 *           type: string
 *           example: 99g5679f00ef95go2874e58d
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 155
 *           example: my title
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *             example: [my-category]
 *         status:
 *           type: string
 *           enum:
 *             - published
 *             - draft
 *           example: published
 *         content:
 *           type: string
 *           minLength: 50
 *           example: this is my content
 *         image:
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
