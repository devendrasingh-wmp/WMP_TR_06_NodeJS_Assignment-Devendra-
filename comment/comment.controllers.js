const { UpdateFile, commentArray, FetchCommentById, checkIfEmailExists, updateComment,deleteCommentbyId } = require('./comment.repository');

/**
 * Fetches all comments from the database and returns them in the response.
 * Handles cases where the database is empty or inaccessible.
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {JSON} - A JSON response with the list of comments or an error message
 */
const getComments = async(req, res) => {
    try {
        // Fetch all comments from the DB
        const comments = await commentArray(); 
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
const getCommentById = async(req, res) => {
    try {
        // Extract the comment ID from URL parameters
        const commentId = req.params.id; 

        // Fetch all comments
        const comment= await FetchCommentById(commentId); 

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
                message: 'Error while fetching the comment by ID',
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
const addComment = async(req, res) => {
    try {
        // Destructure the incoming request body
        const { name, email, comment } = req.body;  
        const nwComment = comment.trim(); 


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
        
        // check for email
        if (await checkIfEmailExists(email)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                error: {
                    message: 'Email already in use or not a valid email.',
                    details: 'Please use a unique and valid email address.',
                },
            });
        }  
    
        // Create a new comment object
        const newComment = {
            // Generate a unique ID for the new comment
            name:name,
            email:email,
            comment:nwComment,
        };

        // Add the new comment to the array
        const response = await UpdateFile(newComment);
        console.log(response);
    
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
const editComment = async (req, res) => {
    try {
        // Extract the comment ID from URL parameters
        const commentId = req.params.id;

        // Destructure the incoming request body to get the comment content
        const { comment } = req.body;

        // Trim leading/trailing spaces from the comment
        const newComment = comment.trim();

        // Validate comment: must be a non-empty string
        if (typeof newComment !== 'string' || newComment === '') {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                error: {
                    message: 'Invalid comment.',
                    details: 'Comment cannot be empty or just whitespace.',
                },
            });
        }

        // Fetch the existing comment by ID
        const existingComment = await FetchCommentById(commentId);
        if (!existingComment) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                error: {
                    message: 'Comment not found.',
                    details: 'No comment found with the given ID.',
                },
            });
        }

        // Update the comment with the new content
        await updateComment(commentId, newComment);

        // Return success response with the updated comment
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Comment updated successfully.',
            data: existingComment,  // Return the updated comment data
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
const deleteComment = async(req, res) => {
    try {
        // Extract the comment ID from URL parameters
        const commentId = req.params.id;  

        const existingComment = await FetchCommentById(commentId);
        if (!existingComment) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                error: {
                    message: 'Comment not found.',
                    details: 'No comment found with the given ID.',
                },
            });
        }
        
        await deleteCommentbyId(commentId);
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
