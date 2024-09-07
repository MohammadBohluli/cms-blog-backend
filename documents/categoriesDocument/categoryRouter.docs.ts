/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - categories
 *     summary: List of categories
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/CategoriesResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /categories/{categorySlug}:
 *   get:
 *     tags:
 *       - categories
 *     summary: Get category by slug
 *     parameters:
 *       - name: categorySlug
 *         in: path
 *         description: Unique slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/CategoryResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - categories
 *     summary: Create a new category
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/CreateCategoryResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /categories/{categorySlug}:
 *   put:
 *     tags:
 *       - categories
 *     summary: Update category
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UpdateCategory'
 *     parameters:
 *       - name: categorySlug
 *         in: path
 *         description: Unique slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/UpdateCategoryResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /categories/{categorySlug}:
 *   delete:
 *     tags:
 *       - categories
 *     summary: Delete category
 *     parameters:
 *       - name: categorySlug
 *         in: path
 *         description: Unique slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/DeleteCategoryResponse'
 */
