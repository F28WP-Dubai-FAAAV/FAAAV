import Player from './Player.js'
import Movement from './Movement.js'
//Selecting the div with class maze
const maze = document.querySelector(".maze")

const players = []
players.push(new Player('AbdulKader',players.length+1))
players[0].createPlayer(maze,400,400);

const controller = new Movement(players[0])

// Code from Frank's Laboratory
let fps, fpsInterval, startTime, now, then, elapsed;
fps = 60;
function startAnimate(fps){
  fpsInterval = 1000/fps
  then = Date.now()
  startTime = then
  update()
}

function update(){
  requestAnimationFrame(update)
  now = Date.now()
  elapsed = now - then
  if(elapsed > fpsInterval){
    then = now - (elapsed % fpsInterval)
    players[0].animate()
  }
}

startAnimate(fps)

document.addEventListener("keydown",(e)=>{
    controller.movementHandler(e,true)
});
document.addEventListener("keyup", (e)=>{
    controller.movementHandler(e,false)
})