import Player from './Player.js'
import GameController from './GameController.js'
import MazeGenerator from "./MazeGenerator.js"
import Bullet from "./Bullet.js"

//Selecting the div with class maze
const maze = document.querySelector(".maze")
// creating and rendering the maze on the screen
const mazeGen = new MazeGenerator(maze);
mazeGen.createMaze(mazeGen.maze1);

// variable to store the main players username
const username = "AbdulKader"

// array to store all the players
const players = []
//Pushing new players in the array
players.push(new Player('AbdulKader',players.length+1))
//creating the player and displaying it on the screen
players[0].createPlayer(maze,120,120);

// array to store all the bullets
const bullets = [new Bullet(players,mazeGen.maze1), new Bullet(players,mazeGen.maze1), new Bullet(players,mazeGen.maze1), new Bullet(players,mazeGen.maze1)]
bullets.forEach(bullet=>{
  bullet.createBullet(maze);
})

//controller to control a players movement
const controller = new GameController([players.filter(player=> player.username === username)[0], mazeGen.maze1, bullets])
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
    // animate all the players and bullets
    players.forEach(player=>{
      player.animate()
    })

    bullets.forEach(bullet=>{
      bullet.animate()
    })
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