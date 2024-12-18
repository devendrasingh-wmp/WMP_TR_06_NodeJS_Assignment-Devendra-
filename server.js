const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/comment.routes');
app.use(bodyParser.json());

// swagger packages
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./SwaggerConfig/swaggerDocs');

// Documenting the swagger 

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec));

// ===================== || DB Connection with Sequilize || ================
const { testDbConnection } = require('./DBConfig/sequilizeConfig');
testDbConnection();
// ===================== End DB Connection =====================

// Use the comment routes
app.use('/user', commentRoutes);

// Catch undefined routes or errors in the `/user` route
app.use('/user/*', (req, res, next) => {
    res.redirect('/error');
});

// Define the `/error` route
app.get('/error', (req, res) => {
    res.status(404).send('Page not found. Please check your request.');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
