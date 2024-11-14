const express = require('express');
const app = express();

const commentRoutes = require('./routes/commentRoute');
const bodyParser = require('body-parser');


app.use(bodyParser.json());


app.use(commentRoutes);

const PORT = 3000 || process.env.PORT;

app.listen(PORT , ()=>{
    console.log("Server is running on port 3000")
})