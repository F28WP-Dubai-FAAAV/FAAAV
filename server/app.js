//importing 
const express = require('express')
const mongoose = require('mongoose')  
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

//object to connect to database
const dbURI = `mongodb+srv://abdulkader:test1234@cluster0.xwfst.mongodb.net/TheDarkMaze?retryWrites=true&w=majority`

//creating server
const server = app.listen(port, ()=>{console.log(`listening at port ${port}`)})

//connection to database
mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log('DataBase Connected')})
    .catch(err=>{console.log(err)})

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

//searching if game is created using asynchronous requests
app.post('/search', async (req,res)=>{
    let isRoom = true;
    //roomId existence checks ie capacity existence
    if('create' in req.body){
        req.body.roomId = roomIdGenerator()
        delete req.body.create
    }
    else{
        if(!req.body.roomId){
            res.redirect("/join/roomId")
            return;
        }
        req.body.roomId = (req.body.roomId).toUpperCase()
        const roomExists = await Rooms.find({roomId:req.body.roomId}, (req,data)=>{})
        if(roomExists.length === 0){
            res.redirect("/join/existance")
            return
        }
        else if(roomExists[0].players.length >= 4){
            res.redirect("/join/capacity")
            return
        }

        if(roomExists[0].isPlaying){
            res.redirect('/join/started')
            return
        }

        isRoom = false;
        delete req.body.join
    }

    const player = new Players(req.body)
    await player.save()
    let room;
    if(isRoom){
        room = {
            roomId: req.body.roomId,
            players: [player],
            isPlaying: false
        }
        await createRoom(room)
    }
    else{
        await updateRoom(req.body.roomId, player)
    }
    res.redirect(`/lobby/${req.body.roomId}&${player._id}`)
})

