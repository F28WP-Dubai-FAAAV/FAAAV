import {IP} from './CONST.js'

const socket = io.connect(IP)
const joinBtn = document.querySelector('.join-room-btn')
const username = document.getElementById('username')
const room = document.getElementById('room')

joinBtn.addEventListener('click', ()=>{
    if(username.value.length >=3 && room.value){
        socket.emit('join_room', room.value)
    }
})