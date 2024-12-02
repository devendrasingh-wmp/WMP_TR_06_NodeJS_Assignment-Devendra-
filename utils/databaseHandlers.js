const fs = require('fs');
const path = require('path');

// This module provides utility functions to manage and manipulate comments stored in a JSON file.
// It includes functions to fetch all comments from the database file and update the file when comments are modified.

// Path to the comments database file
const filePath = path.join(__dirname, '../DB/db.json');  

/**
 * Fetches the array of comments from the JSON database file.
 * If the file is not found or is empty, it returns an empty array.
 * 
 * @returns {Array} - Array of comments from the database
 */
const commentArray = () => {
    try {
        // Read the JSON file content
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Parse the JSON content into a JavaScript object/array
        return JSON.parse(fileContent);  
    } catch (error) {
        // Log error if reading fails
        console.error('Error while fetching the data from the file', error);  

        // Return empty array if there's an error (e.g., file not found or empty)
        return []; 
    }
};

/**
 * Updates the JSON database file with the given comments array.
 * Logs an appropriate message based on the success or failure of the operation.
 * 
 * @param {Array} comments - The updated array of comments to be written to the file
 */
const UpdateFile = (comments) => {
    try {

        // Write comments to the file with indentation
        fs.writeFileSync(filePath, JSON.stringify(comments, null, 4), 'utf8');  

        // Log success if file is updated
        console.log('File successfully updated');  
    } catch (error) {

        // Check for specific error codes
        if (error.code === 'EACCES') {

            // Permission issue
            console.error(`Error: Permission denied for writing to file at ${filePath}`);  
        } else {

             // Log other unexpected errors
            console.error(`Unexpected error while updating the file: ${error.message}`); 
        }
    }
};

// Exporting utility functions for managing the comments database
module.exports = {
    commentArray,
    UpdateFile
};
