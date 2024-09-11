/**
 * @swagger
 * components:
 *   response:
 *
 *
 *
 *
 *
 *     ArticlesResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 66bc679f00ef88c82874e4kh
 *               userId:
 *                 type: string
 *                 example: 95vk584g00ef88c81258k36m
 *               title:
 *                 type: string
 *                 example: this is title
 *               slug:
 *                 type: string
 *                 example: this-is-title
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: my-category
 *               status:
 *                 type: string
 *                 enum:
 *                   - published
 *                   - draft
 *                 example: published
 *               content:
 *                 type: string
 *                 example: this is content
 *               image:
 *                 type: string
 *                 example: "http://localhost:3000/images/63876edf-Logo.jpg"
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-07T20:40:28.356Z"
 *               updatedAt:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-07T20:45:28.356Z"
 *         pagination:
 *           type: object
 *           properties:
 *             totalPages:
 *               type: integer
 *               example: 4
 *             previousPage:
 *               type:
 *                 - integer
 *                 - 'null'
 *               example: null
 *             currentPage:
 *               type: integer
 *               example: 1
 *             nextPage:
 *               type:
 *                 - integer
 *                 - 'null'
 *               example: 2
 *
 *
 *
 *
 *     ArticlesUserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 66bc679f00ef88c82874e4kh
 *               userId:
 *                 type: string
 *                 example: 95vk584g00ef88c81258k36m
 *               title:
 *                 type: string
 *                 example: this is title
 *               slug:
 *                 type: string
 *                 example: this-is-title
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: my-category
 *               status:
 *                 type: string
 *                 enum:
 *                   - published
 *                   - draft
 *                 example: published
 *               content:
 *                 type: string
 *                 minLength: 50
 *                 example: this is content
 *               image:
 *                 type: string
 *                 example: "http://localhost:3000/images/63876edf-Logo.jpg"
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-07T20:40:28.356Z"
 *               updatedAt:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-07T20:45:28.356Z"
 *
 *
 *
 *
 *     CreateArticlesResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Successfully created article
 *
 *
 *
 *
 *     UpdateArticlesResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Successfully updated article
 *
 *
 *
 *
 *     DeleteArticlesResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Successfully deleted article
 */
