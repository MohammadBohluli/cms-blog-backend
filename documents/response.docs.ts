/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         message:
 *           type:
 *             - string
 *             - array<string>
 *         data:
 *           type:
 *             - object
 *             - array<object>
 *         pagination:
 *           properties:
 *             totalPages:
 *               type: integer
 *             previousPage:
 *               type:
 *                 - string
 *                 - 'null'
 *             currentPage:
 *               type: integer
 *             nextPage:
 *               type:
 *                 - string
 *                 - 'null'
 */
