//importing 
const express = require('express')
const path = require('path')
const uuid = require('uuid')

//storing path (for models/schema)
const Players = require('./models/players')
const Rooms = require('./models/rooms')

//port 
const port = process.env.PORT || 3000

//initialising express
const app = express()

//setting view engine embedded javaScript(ejs)
app.set('views', './client/views')
app.set('view engine', 'ejs')

//creating server
const server = app.listen(port, ()=>{console.log(`listening at port ${port}`)})

//
app.use(express.static(path.join(__dirname ,'../client')))
//using express to fetch json object
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routing (main page)
app.get('/', (req,res)=>{
    //renders the page accordiong to the appropriate parameters
    res.render("index", { title: "Main", styles:['styles.css']});
})
