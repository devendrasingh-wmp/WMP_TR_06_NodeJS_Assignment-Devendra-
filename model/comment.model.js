const { Sequelize, DataTypes } = require('sequelize');
const { sq } = require('../DBConfig/sequilizeConfig'); // Import your Sequelize instance

const Comments = sq.define(
    'comments',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: 'Email is required' },
                isEmail: { msg: 'Email must be in a valid format (e.g., user@example.com)' },
                customEmailValidation(value) {
                    console.log('Validating:', value); // Check what value is being passed
                    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!emailRegex.test(value)) {
                        throw new Error('Email must start with a letter and match the required format (e.g., user@example.com)');
                    }
                },
                
                           
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Name is required' },
                len: {
                    args: [3, 50],
                    msg: 'Name must be between 3 and 50 characters',
                },
            },
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Comment is required' },
                len: {
                    args: [5, 255],
                    msg: 'Comment must be between 5 and 255 characters',
                },
            },
        },
    },
    {
        tableName: 'comments',
        timestamps: true,
    }
);
Comments.sync({});
console.log('The table for the User model was just (re)created!');

// Export the model
module.exports = Comments;
