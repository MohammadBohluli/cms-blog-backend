/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         message:
 *           type:
 *             - string
 *             - array<string>
 *   responses:
 *     InternalServerError:
 *       description: Internal server error
 *     NotFoundError:
 *       description: Not found
 *     BadRequestError:
 *       description: Bad request
 *     ConflictError:
 *       description: Conflict
 *     UnauthorizedError:
 *       description: Invalid credentials
 *     ForbiddenError:
 *       description: Permission denied
 */
