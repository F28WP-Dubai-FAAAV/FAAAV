import {IP} from './CONST.js'

const playerContainer = document.querySelector('.players-container')
const RoomId = JSON.parse(roomInfo).roomId
const mainId = JSON.parse(mainPlayer)._id
const socket = io.connect(IP)

if(sessionStorage.getItem('isHost') === null){
    if(JSON.parse(roomInfo).players.length === 1){
        sessionStorage.setItem('isHost', true)
    }
    else{
        sessionStorage.setItem('isHost', false)
    }
}

const isHost = sessionStorage.getItem('isHost')==='true'?true:false

socket.on('connect', ()=>{
    socket.emit('join', RoomId)
})

socket.on('disconnect', ()=>{
    sessionStorage.clear()
})

socket.on('player_joined', (room)=>{
    if(room){
        roomInfo = JSON.stringify(room[0])
        sessionStorage.setItem('room', roomInfo)
    }
    addPlayers()
})

socket.on('start_game', (roomId)=>{
    window.location.href = `/loading/${roomId}`
})

const startingGame = ()=>{
    socket.emit('game_starting', RoomId)
}

const addPlayers = () => {
    const mainRoom = JSON.parse(roomInfo)
    const main = JSON.parse(mainPlayer)
    playerContainer.innerHTML = ''
    mainRoom.players.forEach((player,index)=>{
        const playerDiv = document.createElement('div')
        playerDiv.classList.add('player')
        playerDiv.id = index+1
        playerContainer.appendChild(playerDiv)

        const avatar = document.createElement('img')
        avatar.src = `../Assets/avatars/hero_${index+1}.gif`
        playerDiv.appendChild(avatar)

        const username = document.createElement('div')
        username.classList.add('username')
        if(player._id === main._id){
            username.classList.add('main')
        }
        username.innerHTML = player.username
        playerDiv.appendChild(username)
    })
    const startBtn = document.querySelector('.start-btn')
    startBtn.innerHTML = ''
    startBtn.appendChild(createStartButton())
}

const createStartButton = () => {
    const playBtn = document.createElement('button')
    playBtn.classList.add("btn", "play")
    playBtn.innerText = isHost? 'Start':'Waiting for Host...'
    if(!isHost){
        playBtn.classList.add('disabled')
    }
    playBtn.onclick = startingGame
    return playBtn
}

addPlayers()