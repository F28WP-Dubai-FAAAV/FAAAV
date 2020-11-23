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

app.get('/join/:error?', (req,res)=>{
    res.render("join", { title: "Join", styles:['styles.css', 'join.css'], error: req.params.error});
})

app.get('/lobby/:roomId&:playerId', async (req,res)=>{
    const room = await Rooms.find({roomId: req.params.roomId }, (req,data)=>{})
    res.render("lobby", { title: "Lobby", styles:['styles.css', 'lobby.css'], room:room, playerId: req.params.playerId});
})

app.get('/game/:roomId', async (req,res)=>{
    const room = await Rooms.find({roomId:req.params.roomId}, (req,data)=>{})
    res.render('game', {title: req.params.roomId, styles:['gameStyle.css']})
})

app.get('/loading/:roomId', async (req,res)=>{
    res.render('loading', {title: req.params.roomId, styles:['styles.css']})
    const pos= [[120,120], [680, 120], [120,680], [680,680] ]
    const room = await Rooms.find({roomId:req.params.roomId}, (req,data)=>{})
    const state = {}
    room[0].players.forEach((player,index)=>{
        state[index+1] = { pos: pos[index]}
    })
    room[0].state = state
    await room[0].save()
})