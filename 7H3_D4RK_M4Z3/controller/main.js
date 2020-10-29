import Player from './Player.js'
import Movement from './Movement.js'
import MazeGenerator from "./MazeGenerator.js"
//Selecting the div with class maze
const maze = document.querySelector(".maze")

const mazeGen = new MazeGenerator(maze);
mazeGen.createMaze(mazeGen.maze1);

// array to store all the players
const players = []
//Pushing new players in the array
players.push(new Player('AbdulKader',players.length+1))
//creating the player and displaying it on the screen
players[0].createPlayer(maze,400,400);

//controller to control a players movement
const controller = new Movement(players[0])

// Creating a way to render on the screen
let fps, fpsInterval, startTime, now, then, elapsed;
// initializing the fps the game will run at
fps = 60;

// starts the the game
function startAnimate(fps){
  fpsInterval = 1000/fps
  then = Date.now()
  startTime = then
  update()
}

// updates the game every 1000/60 seconds
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

// Listenes for keydown and keyup events
document.addEventListener("keydown",(e)=>{
    controller.movementHandler(e,true)
});
document.addEventListener("keyup", (e)=>{
    controller.movementHandler(e,false)
})