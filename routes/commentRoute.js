const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to get all comments
router.get('/comments', commentController.getComments);

// Route to get a specific comment by using ID
router.get('/comments/:id', commentController.getCommentById);

// Route to add a new comment
router.post('/comments/add', commentController.addComment);

// Edit a particular comment
router.put('/comments/edit/:id', commentController.editComment);

// Route to delete a particular comment
router.delete('/comments/delete/:id', commentController.deleteComment);

module.exports = router;
