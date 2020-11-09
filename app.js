// Done by Faizan
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/users');

//connect to mongodb
const dbURI = 'mongodb+srv://fhp1:<password>@cluster0.yl7ru.mongodb.net/the_dark_maze?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// express app
const app = express();
app.use(morgan('tiny'));

// mongoose and mango sandbox routes
app.get('/add-user', (req, res) => {
  const user = new User({
    userName: 'faizzan',
    name: 'Faizan',
    email_id: 'fhp1@hw.ac.uk'
  });

  user.save()
    .then((result) =>{
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', {root: __dirname});
});

app.get('/login', (req, res) => {
    res.sendFile('./views/login.html', {root: __dirname});
});

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});

});
