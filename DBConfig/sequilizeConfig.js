const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME1, process.env.PASSWORD, {
  host: 'localhost',  
  dialect: 'postgres',  
});     
 
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { sq: sequelize, testDbConnection };   