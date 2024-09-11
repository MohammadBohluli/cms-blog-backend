/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - articles
 *     summary: Show all articles that published(not draft)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/ArticlesResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /articles/users/{userId}:
 *   get:
 *     tags:
 *       - articles
 *     summary: Show articles user that published(not draft)
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/ArticlesUserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /{articleSlug}:
 *   get:
 *     tags:
 *       - articles
 *     summary: Show article that published(not draft)
 *     parameters:
 *       - name: articleSlug
 *         in: path
 *         description: article Slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/ArticlesUserResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /articles:
 *   post:
 *     tags:
 *       - articles
 *     summary: Create article
 *     requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/CreateArticle'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/CreateArticlesResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /articles/{articleSlug}:
 *   put:
 *     tags:
 *       - articles
 *     summary: Update article
 *     parameters:
 *       - name: articleSlug
 *         in: path
 *         description: article Slug
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                $ref: '#/components/schemas/UpdateArticle'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/UpdateArticlesResponse'
 */
//////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /articles/{articleSlug}:
 *   delete:
 *     tags:
 *       - articles
 *     summary: Delete article
 *     parameters:
 *       - name: articleSlug
 *         in: path
 *         description: article Slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/response/DeleteArticlesResponse'
 */
