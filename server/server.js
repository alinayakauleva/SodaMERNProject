require("dotenv").config(); 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({extended: true, limit: '20mb'}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/recipe.routes')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));