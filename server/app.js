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

//routing (join page) 
//:error? sanity check
app.get('/join/:error?', (req,res)=>{
    res.render("join", { title: "Join", styles:['styles.css', 'join.css'], error: req.params.error});
})

//routing for lobby using promises, setting up the lobby according to rooms/players id
app.get('/lobby/:roomId&:playerId', async (req,res)=>{
    //finds room using room id, and sends it back using promises
    const room = await Rooms.find({roomId: req.params.roomId }, (req,data)=>{})
    //renders the page accordiong to the appropriate parameters
    res.render("lobby", { title: "Lobby", styles:['styles.css', 'lobby.css'], room:room, playerId: req.params.playerId});
})

//routing to the game 
app.get('/game/:roomId', async (req,res)=>{
    const room = await Rooms.find({roomId:req.params.roomId}, (req,data)=>{})
    //renders the page accordiong to the appropriate parameters
    res.render('game', {title: req.params.roomId, styles:['gameStyle.css']})
})

//routing (loading page)
app.get('/loading/:roomId', async (req,res)=>{
    //renders the loading page
    res.render('loading', {title: req.params.roomId, styles:['styles.css']})
    //sets the position of the players 
    const pos= [[120,120], [680, 120], [120,680], [680,680] ]
    const room = await Rooms.find({roomId:req.params.roomId}, (req,data)=>{})
    //players state
    const state = {}
    room[0].players.forEach((player,index)=>{
        state[index+1] = { pos: pos[index]}
    })
    room[0].state = state
    //promises, waits till data is fetched
    await room[0].save()
})

