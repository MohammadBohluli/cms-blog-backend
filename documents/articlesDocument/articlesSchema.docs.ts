/**
 * @swagger
 * components:
 *   schemas:
 *
 *
 *
 *
 *
 *     CreateArticle:
 *       type: object
 *       required:
 *         - title
 *         - categories
 *         - status
 *         - content
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           example: my title
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *             example: my-category
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
 *
 *
 *
 *
 *     UpdateArticle:
 *       type: object
 *       required:
 *         - title
 *         - categories
 *         - status
 *         - content
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           example: my title
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *             example: my-category
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
 */
