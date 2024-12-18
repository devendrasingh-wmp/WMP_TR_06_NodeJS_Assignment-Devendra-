const express = require('express');
const router = express.Router();
const commentController = require('../comment/comment.controllers');
const { validEmail, validData } = require('../middlewares/comment.validations');

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get the list of comments
 *     description: Retrieve all comments available in the system.
 *     responses:
 *       200:
 *         description: List of all comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   comment:
 *                     type: string
 *       400:
 *           description: Error while fetching the comment
 */
router.get('/comments', commentController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get a specific comment by ID
 *     description: Retrieve a single comment using its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the comment
 *     responses:
 *       200:
 *         description: The requested comment object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 comment:
 *                   type: string
 *       404:
 *         description: Comment not found.
 */
router.get('/comments/:id', commentController.getCommentById);

/**
 * @swagger
 * /comments/add:
 *   post:
 *     tags: [Comments]
 *     summary: Add a new comment
 *     description: Create a new comment and add it to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the commenter
 *               email:
 *                 type: string
 *                 description: Email of the commenter
 *               comment:
 *                 type: string
 *                 description: The comment text
 *     responses:
 *       200:
 *         description: Comment successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     comment:
 *                       type: string
 *       400:
 *          description: Error while adding comment.
 */ 
router.post('/comments/add', validData,commentController.addComment);

/**
 * @swagger
 * /comments/edit/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Edit a specific comment
 *     description: Update the details of an existing comment.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the commenter
 *               email:
 *                 type: string
 *                 description: Updated email of the commenter
 *               comment:
 *                 type: string
 *                 description: Updated comment text
 *     responses:
 *       200:
 *         description: Comment successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     comment:
 *                       type: string
 */
router.put('/comments/edit/:id', commentController.editComment);

/**
 * @swagger
 * /comments/delete/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a specific comment
 *     description: Remove an existing comment from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the comment
 *     responses:
 *       200:
 *         description: Comment successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/comments/delete/:id', commentController.deleteComment);

module.exports = router;
