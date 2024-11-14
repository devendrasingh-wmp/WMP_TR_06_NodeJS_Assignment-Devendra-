const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../DB/db.json');

// Fetch Array from DB
const commentArray = () => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
};

// Edit array in DB
const UpdateFile = (comments) => {
    fs.writeFileSync(filePath, JSON.stringify(comments, null, 4), 'utf8');
};

// Controller to get all comments
const getComments = (req, res) => {
    try {
        const comments = commentArray();
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get a particular comment
const getCommentById = (req, res) => {
    const commentId = parseInt(req.params.id);
    const comments = commentArray();
    const comment = comments.find(comment => comment.id === commentId);

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
    }

    res.status(200).json({ message: 'Comment fetched successfully.', comment });
};

// Controller to add a new comment
const addComment = (req, res) => {
    const { username, comment } = req.body;

    if (!username || !comment) {
        return res.status(400).json({ message: 'Username and comment are required.' });
    }

    const comments = commentArray();
    const newComment = { id: comments.length + 1, username, comment };
    comments.push(newComment);

    UpdateFile(comments);
    res.status(201).json({ message: 'Comment added successfully.', comment: newComment });
};

// Controller to edit a comment by ID
const editComment = (req, res) => {
    const commentId = parseInt(req.params.id);
    const { username, comment } = req.body;

    if (!username || !comment) {
        return res.status(400).json({ message: 'Username and comment are required.' });
    }

    const comments = commentArray();
    const commentIndex = comments.findIndex(comment => comment.id === commentId);

    if (commentIndex === -1) {
        return res.status(404).json({ message: 'Comment not found.' });
    }

    comments[commentIndex] = { id: commentId, username, comment };
    UpdateFile(comments);

    res.status(200).json({ message: 'Comment updated successfully.', comment: comments[commentIndex] });
};

// Controller to delete a comment by ID
const deleteComment = (req, res) => {
    const commentId = parseInt(req.params.id);
    const comments = commentArray();
    const updatedComments = comments.filter(comment => comment.id !== commentId);

    if (comments.length === updatedComments.length) {
        return res.status(404).json({ message: 'Comment not found.' });
    }

    UpdateFile(updatedComments);
    res.status(200).json({ message: 'Comment deleted successfully.' });
};

module.exports = {
    getComments,
    getCommentById,
    addComment,
    editComment,
    deleteComment
};
