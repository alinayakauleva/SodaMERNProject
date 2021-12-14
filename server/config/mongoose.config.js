const mongoose = require('mongoose');

const dbName = 'recipe_db';

mongoose.connect('mongodb://localhost/' + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database connection established'))
    .catch(err => console.log('Something went wrong when connecting to the database', err));