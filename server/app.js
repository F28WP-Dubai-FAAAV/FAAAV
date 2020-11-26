const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const uuid = require('uuid')

const Players = require('./models/players')
const Rooms = require('./models/rooms')

const State = []

const port = process.env.PORT || 3000

const app = express()

app.set('views', './client/views')
app.set('view engine', 'ejs')

const dbURI = `mongodb+srv://abdulkader:test1234@cluster0.xwfst.mongodb.net/TheDarkMaze?retryWrites=true&w=majority`

const server = app.listen(port, ()=>{console.log(`listening at port ${port}`)})

mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log('DataBase Connected')})
    .catch(err=>{console.log(err)})

app.use(express.static(path.join(__dirname ,'../client')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.render("index", { title: "Main", styles:['styles.css']});
})

app.get('/join/:error?', (req,res)=>{
    res.render("join", { title: "Join", styles:['styles.css', 'join.css'], error: req.params.error});
})

app.get('/gameover', (req,res)=>{
    res.render("gameover", { title: "GameOver", styles:['styles.css'], error: req.params.error});
})

app.get('/victory', (req,res)=>{
    res.render("victory", { title: "Victory", styles:['styles.css'], error: req.params.error});
})

app.get('/lobby/:roomId&:playerId', async (req,res)=>{
    const room = await Rooms.find({roomId: req.params.roomId }, (req,data)=>{})
    res.render("lobby", { title: "Lobby", styles:['styles.css', 'lobby.css'], room:room, playerId: req.params.playerId});
})

app.get('/game/:roomId', async (req,res)=>{
    const room = await Rooms.find({roomId:req.params.roomId}, (req,data)=>{})
    room[0].isPlaying = true
    await room[0].save()
    res.render('game', {title: req.params.roomId, styles:['gameStyle.css']})
})

app.get('/loading/:roomId', async (req,res)=>{
    res.render('loading', {title: req.params.roomId, styles:['styles.css']})
    const spawnPos= [[120,120], [680, 120], [120,680], [680,680] ]
    const room = await Rooms.find({roomId:req.params.roomId}, (req,data)=>{})
    const stateInfo = {
        roomId:req.params.roomId,
        state:{},
    }

    room[0].players.forEach((player,index)=>{
        stateInfo.state[index+1] = { 
            pos: spawnPos[index], 
            direction: {facing:'', moving:'', shoot:''},
            bullets: [],
            bulletInfo: {
                hasBullet:false,
                playerBullet: -1,
                isShoot: false
            }
        }
    })

    State.push(stateInfo)
})

app.post('/search', async (req,res)=>{
    let isRoom = true;
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

const createRoom = async (room) => {
    const rooms = new Rooms(room)
    await rooms.save().then().catch(err=> console.log(err))
}

const roomIdGenerator = ()=>{
    const roomId = uuid.v4().split('-')[0].toUpperCase()
    return roomId
}

const updateRoom = async (roomId, player)=>{
    const updatedRoom = await Rooms.find({roomId: roomId}, (req,data)=>{})
    updatedRoom[0].players = [...updatedRoom[0].players, player]
    await updatedRoom[0].save()
}

const io = require('socket.io')(server)


io.sockets.on('connection', (socket)=>{
    socket.on('join', (roomId)=>{
        socket.join(roomId)
    })

    socket.on('join_room',async (roomId)=>{
        await setTimeout(async ()=>{
            const room = await Rooms.find({roomId: roomId }, ()=>{})
            io.in(roomId).emit('player_joined',room)
        },1000)
    })

    socket.on('game_starting', (roomId)=>{
        io.in(roomId).emit('start_game', roomId)
    })

    socket.on('get_state', async (roomId)=>{
        const stateInfo = State.filter(info=> info.roomId == roomId)
        io.in(roomId).emit('set_state', stateInfo[0].state)
    })

    socket.on('update_state', async (roomId, state)=>{
        State.filter(info=> {
            if(info.roomId == roomId){
                info.state = state
            }
        })
        const stateInfo = State.filter(info=>info.roomId == roomId)
        io.in(roomId).emit('set_state', stateInfo[0].state)
    })
})


app.use((req, res) => {
    res.render("404", { title: "404", styles:['styles.css', '404.css'] });
});