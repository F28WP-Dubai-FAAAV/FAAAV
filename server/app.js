const express = require('express')
const path = require('path')
const uuid = require('uuid')

const Players = require('./models/players')
const Rooms = require('./models/rooms')

const port = process.env.PORT || 3000

const app = express()

app.set('views', './client/views')
app.set('view engine', 'ejs')

const server = app.listen(port, ()=>{console.log(`listening at port ${port}`)})

app.use(express.static(path.join(__dirname ,'../client')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.render("index", { title: "Main", styles:['styles.css']});
})

