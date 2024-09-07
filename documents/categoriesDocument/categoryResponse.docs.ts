/**
 * @swagger
 * components:
 *   response:
 *
 *
 *
 *
 *
 *     CategoriesResponse:
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
 *               title:
 *                 type: string
 *                 example: my category
 *               slug:
 *                 type: string
 *                 example: my-category
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
 *     CategoryResponse:
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
 *             title:
 *               type: string
 *               example: my category
 *             slug:
 *               type: string
 *               example: my-category
 *             createdAt:
 *               type: string
 *               format: date
 *               example: "2024-08-07T20:40:28.356Z"
 *             updatedAt:
 *               type: string
 *               format: date
 *               example: "2024-08-07T20:45:28.356Z"
 *
 *
 *
 *
 *     CreateCategoryResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Successfully created Category
 *
 *
 *
 *
 *     UpdateCategoryResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Successfully updated Category
 *
 *
 *
 *
 *     DeleteCategoryResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Successfully deleted Category
 */
