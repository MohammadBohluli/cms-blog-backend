/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - articles
 *     summary: Show all articles that published(not draft)
 *     parameters:
 *       - name: title
 *         in: query
 *         description: search article based on title
 *         required: false
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         description: search article based on category(categories are 'and' operator not 'or') such as category-1,catgory-2,...
 *         required: false
 *         schema:
 *           type: string
 *       - name: startCreatedAt
 *         in: query
 *         description: search article based on createdAt
 *         required: false
 *         schema:
 *           type: string
 *       - name: endCreatedAt
 *         in: query
 *         description: search article based on createdAt
 *         required: false
 *         schema:
 *           type: string
 *       - name: sortBy
 *         in: query
 *         description: example => updatedAt or -updatedAt
 *         required: false
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: limitation of per page to show content
 *         required: false
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         description: page
 *         required: false
 *         schema:
 *           type: integer
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
 *                type: object
 *                required:
 *                  - title
 *                  - categories
 *                  - status
 *                  - content
 *                  - image
 *                properties:
 *                  title:
 *                    type: string
 *                    example: my title
 *                  categories:
 *                    type: array
 *                    items:
 *                      type: string
 *                      example: my-category
 *                  status:
 *                    type: string
 *                    enum:
 *                      - published
 *                      - draft
 *                    example: published
 *                  content:
 *                    type: string
 *                    minLength: 50
 *                    example: this is my content
 *                  image:
 *                    type: string
 *                    format: binary
 *                    example: "http://localhost:3000/images/0843d5c7-Logo.jpg"
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
 *                type: object
 *                required:
 *                 - title
 *                 - categories
 *                 - status
 *                 - content
 *                 - image
 *                properties:
 *                 title:
 *                   type: string
 *                   example: my title
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: my-category
 *                 status:
 *                   type: string
 *                   enum:
 *                     - published
 *                     - draft
 *                   example: published
 *                 content:
 *                   type: string
 *                   minLength: 50
 *                   example: this is my content
 *                 image:
 *                   type: string
 *                   format: binary
 *                   example: "http://localhost:3000/images/0843d5c7-Logo.jpg"
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
