const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Comments API',
      version: '1.0.0',
      description: 'API for managing comments',
    },
    servers: [
      {
        url: 'http://localhost:4000/user',
      },
    ],
  },
  apis: ['./routes/*.js'], // Point to the routes folder
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpecs;
