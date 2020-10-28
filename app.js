const express = require('express');
const morgan = require('morgan');

//connect to mongodb
const dbURI = 'mongodb+srv://fhp1:J@m@lpur1@cluster0.yl7ru.mongodb.net/<dbname>?retryWrites=true&w=majority';

// express app
const app = express();

// listen for requests
app.listen(3000);

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./views/login.html', {root: __dirname});
});

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});

});