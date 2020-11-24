import Player from './Player.js'
import GameController from './GameController.js'
import MazeGenerator from "./MazeGenerator.js"
import Bullet from "./Bullet.js"

const init = ()=>{
  //Selecting the div with class maze
  const maze = document.querySelector(".maze")
  // creating and rendering the maze on the screen
  const mazeGen = new MazeGenerator(maze);
  mazeGen.createMaze(mazeGen.maze1);

  // variable to store the main players username
  const username = "Dummy Value"

  // array to store all the players
  const players = []
  const pos= [[120,120], [680, 120], [120,680], [680,680] ]
  players.forEach((player,index)=>{
    player.createPlayer(pos[index][0], pos[index][1]);
  })

  // array to store all the bullets
  const bullets = []
  for(let i=0; i<4; i++){
    bullets.push(new Bullet(players,mazeGen.maze1))
  }
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
      players.forEach((player,index)=>{
        player.animate()
      })

      bullets.forEach(bullet=>{
        // TODO: Send all the bullets data when ever this is updated
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
}

init()