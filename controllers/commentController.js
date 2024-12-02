const { v4: uuidv4 } = require('uuid');  // UUID generation for unique comment IDs
const { UpdateFile, commentArray } = require('../utils/databaseHandlers');

/**
 * Fetches all comments from the database and returns them in the response.
 * Handles cases where the database is empty or inaccessible.
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {JSON} - A JSON response with the list of comments or an error message
 */
const getComments = (req, res) => {
    try {
        // Fetch all comments from the DB
        const comments = commentArray();  
        if (!comments || comments.length === 0) {
            // Return 404 if no comments found
            return res.status(404).json({
                success: false,
                statusCode: 404,
                error: {
                    message: 'The comments file is empty or no comments have been added yet.',
                },
            });
        }

        // Return ok with all comments
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Comments fetched successfully.',
            data: comments,
        });
    } catch (error) {
        // Log error if fetching fails
        console.error('Error fetching comments:', error.message);  
        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: {
                message: 'Internal Server Error.',
            },
        });
    }
};

/**
 * Fetches a single comment by its ID.
 * Handles cases where the ID does not exist in the database.
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {JSON} - A JSON response with the comment or an error message
 */
const getCommentById = (req, res) => {
    try {
        // Extract the comment ID from URL parameters
        const commentId = req.params.id; 

        // Fetch all comments
        const comments = commentArray(); 

        // Find the specific comment by ID
        const comment = comments.find(c => c.id === commentId);  

        if (!comment) {
            // Return 404 if comment is not found
            return res.status(404).json({
                success: false,
                statusCode: 404,
                error: {
                    message: 'Comment not found with the given id.',
                },
            });
        }

        // Return 200 with the found comment
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Comment fetched successfully.',
            data: comment,
        });
    } catch (error) {
        // Log error if fetching by ID fails
        console.error('Error fetching comment by ID:', error.message);  
        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: {
                message: 'Internal Server Error.',
            },
        });
    }
};

/**
 * Adds a new comment to the database.
 * Ensures the email is unique and the comment is valid before saving.
 *
 * @param {Object} req - The HTTP request object containing the new comment details
 * @param {Object} res - The HTTP response object
 * @returns {JSON} - A JSON response with the newly added comment or an error message
 */
const addComment = (req, res) => {
    try {
        // Destructure the incoming request body
        const { name, email, comment } = req.body;  

        // Check if the email is already used
        const comments = commentArray();

          // Trim leading/trailing spaces from comment
          const nwComment = comment.trim(); 

        const emailExists = comments.some(c => c.email === email);
        if (emailExists) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                error: {
                    message: 'Email already in use.',
                    details: 'Please use a unique email address.',
                },
            });
        }

        // Validate comment: must be a non-empty string
        if (!comment || typeof comment !== 'string') {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                error: {
                    message: 'Comment cannot be empty.',
                },
            });
        }

        // Create a new comment object
        const newComment = {
            // Generate a unique ID for the new comment
            id: uuidv4(),  
            name,
            email,
            comment:nwComment,
        };

        // Add the new comment to the array
        comments.push(newComment);

        // Update the file with the new comments array
        UpdateFile(comments);

        // Return 201 with the newly added comment
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Comment added successfully.',
            data: newComment,
        });
    } catch (error) {
        // Log error if adding fails
        console.error('Error adding comment:', error.message); 
        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: {
                message: 'Could not add the comment.',
                details: error.message,
            },
        });
    }
};

/**
 * Updates an existing comment by ID.
 * Validates the new details and ensures no duplicate email.
 *
 * @param {Object} req - The HTTP request object containing updated comment details
 * @param {Object} res - The HTTP response object
 * @returns {JSON} - A JSON response with the updated comment or an error message
 */
const editComment = (req, res) => {
    try {
        // Extract the comment ID from URL parameters
        const commentId = req.params.id;  

        // Destructure the incoming request body
        const { name, email, comment } = req.body;

        // Trim leading/trailing spaces from comment
        const newComment = comment.trim();  
        

        // Fetch all comments from the file
        const comments = commentArray();

        // Ensure no comment with the same email already exists
        const emailExists = comments.some(c => c.email === email && c.id !== commentId);
        if (emailExists) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                error: {
                    message: 'Email already in use.',
                    details: 'Please use a unique email address.',
                },
            });
        }

        // Validate comment: must be a non-empty string
        if (typeof comment !== 'string' || comment.trim() === '') {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                error: {
                    message: 'Invalid comment.',
                    details: 'Comment cannot be empty or just whitespace.',
                },
            });
        }

        // Find the comment by ID
        const commentIndex = comments.findIndex(c => c.id === commentId);

        // Handle the case where the comment ID is not found
        if (commentIndex === -1) {   
            return res.status(404).json({
                success: false,
                statusCode: 404,
                error: {
                    message: 'Comment not found with the given id.',
                },
            });
        }

        // Update the comment with the new details
        comments[commentIndex] = {
            ...comments[commentIndex],  // Retain other properties (e.g., id)
            name,
            email,
            
            comment: newComment,
        };

        // Update the file with the modified comments
        UpdateFile(comments);

        // Return success response with the updated comment
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Comment updated successfully.',
            data: comments[commentIndex],
        });
    } catch (error) {
        // Log error if update fails
        console.error('Error updating comment:', error.message);  
        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: {
                message: 'Could not update the comment.',
                details: error.message,
            },
        });
    }
};

/**
 * Deletes a comment by its ID.
 * Ensures the comment exists before attempting deletion.
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {JSON} - A JSON response confirming the deletion or an error message
 */
const deleteComment = (req, res) => {
    try {
        // Extract the comment ID from URL parameters
        const commentId = req.params.id;  

        // Fetch all comments
        const comments = commentArray();

        // Find the index of the comment by ID
        const commentIndex = comments.findIndex(c => c.id === commentId);

        // Handle the case where the comment ID is not found
        if (commentIndex === -1) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                error: {
                    message: 'Comment not found with the given id.',
                },
            });
        }

        // Remove the comment from the array
        comments.splice(commentIndex, 1);

        // Update the file after deletion
        UpdateFile(comments);

        // Return success response
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Comment deleted successfully.',
        });
    } catch (error) {
        // Log error if deletion fails
        console.error('Error deleting comment:', error.message);  
        return res.status(500).json({
            success: false,
            statusCode: 500,
            error: {
                message: 'Could not delete the comment.',
                details: error.message,
            },
        });
    }
};

module.exports = {
    getComments,
    getCommentById,
    addComment,
    editComment,
    deleteComment,
};
