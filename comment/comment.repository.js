const Comments = require('../model/comment.model');

// Function to update/add a comment to the database
const UpdateFile = async (comments) => {
    try {
        // Await the database operation
        return Comments.create({
            email: comments.email,
            name: comments.name,
            comment: comments.comment,
        });
        //console.log('Comment successfully added to the database');
    } catch (error) {
            console.error(`Unexpected error while updating the database: ${error.message}`);
            return error;        
    }
};

// Function to retrieve all comments from the database
const commentArray = async () => {
    try {
        // Fetch all records from the Comments table using raw SQL
        const fileContent = await Comments.sequelize.query('SELECT * FROM comments', {
            type: Comments.sequelize.QueryTypes.SELECT, // Ensures the result is an array of plain objects
        });
        return fileContent; // Return the array of comment objects
    } catch (error) {
        console.error('Error while fetching data from the database:', error);
        return []; // Return an empty array in case of error
    }
};
// check of data available 
const checkIfEmailExists = async (email) => {
    try {
        // Check if the record with the given email exists
        const result = await Comments.findOne({
            where: { email },
        });
        // If result is null, the email does not exist
        if (result) {
            return true; // Email exists
        } else {
            console.log('No record found for the provided email.');
            return false; // Email does not exist
        }
    } catch (error) {
        console.error('Error while checking email:', error);
        return false; // Return false if error occurs
    }
};



// Find content by id 
const FetchCommentById = async (id) => {
    try {
        // Fetch all records from the Comments table with the id
        return Comments.findOne({where:{id}});
    } catch (error) {
        console.error('Error while fetching data from the database:', error);
        return error;
    }
};

const deleteCommentbyId = async (commentId) => {
    try {
        // Delete the comment with the given ID
        const result = await Comments.destroy({where: {commentId}});// Specify the condition to match the record

        if (result === 0) {
            console.log(`No comment found with ID: ${commentId}`);
        } else {
            console.log(`Comment with ID: ${commentId} successfully deleted.`);
        }
    } catch (error) {
        console.error('Error while deleting comment:', error);
    }
};

const updateComment = async (id, comment) => {
    try {
        // Validate the input parameters
        if (!id) {
            console.error('Error: ID is required for updating a comment.');
            return false;
        }

        // Update the comment in the database
        const updatedRowCount = await Comments.update(
            { comment: comment.trim() }, // Fields to update
            { where: { id } }            // Where condition
        );

        // Check if the update was successful
        if (updatedRowCount === 0) {
            console.error(`Error: No comment found with ID ${id} to update.`);
            return false;
        }

        console.log(`Comment with ID ${id} successfully updated.`);
        return true; 
    } catch (error) {
        console.error('Error while editing comment:', error.message);
        return false;
    }
};

// Exporting utility functions for managing the comments database
module.exports = {
    commentArray,
    UpdateFile,
    FetchCommentById,
    deleteCommentbyId,   
    checkIfEmailExists,
    updateComment,
};
