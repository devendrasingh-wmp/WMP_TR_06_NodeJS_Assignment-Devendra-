const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/commentRoute');
require('dotenv').config();

app.use(bodyParser.json());

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
