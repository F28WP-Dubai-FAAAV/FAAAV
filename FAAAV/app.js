const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const TDM = require('./models/TheDarkMaze');

// express app
const app = express();
//connect to database
const dbURI = mongodb+srv://ayman:Password123@cluster0.ab2e7.mongodb.net/TheDarkMaze?retryWrites=true&w=majority
mongoose.connect(dbURI, { useNewUrlParser: true, use UnifiedTopology: true});
  .then((result) => app.listen(3000))
  .catch((err)=> console.log(err));

// mongoose and mongo sandbox routes
app.get('/add-tdm'), (req,res) => {
  const tdm = new TDM({
    title : 'Players',
    property1: 'UserNames',
    property2: 'Email-ID',
    property3: 'Password',
  });

  tdm.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})


app.listen(3000)

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