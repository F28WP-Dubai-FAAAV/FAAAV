import Player from './Player.js'
//Selecting the div with class maze
const maze = document.querySelector(".maze")

const players = []
players.push(new Player('AbdulKader',players.length+1))
players[0].createPlayer(maze,0,0);

document.addEventListener("keydown",(e)=>{
    players[0].movementHandler(e,true)
});
document.addEventListener("keyup", (e)=>{
    players[0].movementHandler(e,false)
})