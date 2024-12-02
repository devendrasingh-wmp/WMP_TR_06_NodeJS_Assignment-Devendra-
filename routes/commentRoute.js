const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const {validEmail, validData} = require('../middlewares/userMiddlewares');

// route to get all comments
router.get('/comments', commentController.getComments);

// route to get a specific comment by using ID
router.get('/comments/:id', commentController.getCommentById);

// route to add a new comment
router.post('/comments/add',validEmail,validData,commentController.addComment);

// route to edit a particular comment
router.put('/comments/edit/:id',validEmail,validData, commentController.editComment);

// Route to delete a particular comment
router.delete('/comments/delete/:id', commentController.deleteComment);

module.exports = router;
