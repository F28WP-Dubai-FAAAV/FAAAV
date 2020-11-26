import Player from './Player.js'
import GameController from './GameController.js'
import MazeGenerator from "./MazeGenerator.js"
import Bullet from "./Bullet.js"
import {IP} from '../public/javascript/CONST.js'
//importing socket
const socket = io.connect(IP)

const RoomId = JSON.parse(sessionStorage.getItem('room')).roomId
const isHost = sessionStorage.getItem('isHost')==='true'?true:false

let state = null

const bgSound = document.querySelector('.bg-sound')

const repeat = ()=> {
  bgSound.play()
}

const start = ()=> {
  const interval = (60 / 150) * 1000;
  setInterval(() => {
      repeat();
  }, interval)
}

start()

socket.on('connect', ()=>{
  socket.emit('join', RoomId)
  socket.emit('get_state', RoomId)
  setTimeout(()=>{
    init()
  },1000)
})

socket.on('disconnect', ()=>{
  sessionStorage.clear()
})

socket.on('set_state', (gameState)=>{
  state = gameState
})

const init = ()=>{
  //Selecting the div with class maze
  const maze = document.querySelector(".maze")
  // creating and rendering the maze on the screen
  const mazeGen = new MazeGenerator(maze);
  mazeGen.createMaze(mazeGen.maze1);

  // variable to store the main players username
  const mainPlayer = JSON.parse(sessionStorage.getItem('mainPlayer'))
  const username = mainPlayer.username

  // array to store all the players
  const playersInRoom = JSON.parse(sessionStorage.getItem('room')).players
  const players = []

  playersInRoom.forEach((player,index)=>{
    //Pushing new players in the array
    if(player._id == mainPlayer._id){
      players.push(new Player(player.username,players.length+1, true))
    }
    else{
      players.push(new Player(player.username,players.length+1, false))
    }
    players[index].createPlayer(state[(index+1)]['pos'][0],state[(index+1)]['pos'][1]);
  })

  // array to store all the bullets
  let bullets = []
  let isBulletsCreated = false
  for(let i=0; i<4; i++){
    bullets.push(new Bullet(players,mazeGen.maze1, i+1))
  }

  if(isHost){
    isBulletsCreated = true
    bullets.forEach((bullet, index)=>{
      bullet.createBullet(maze);
    })
    players.forEach((player, index)=>{
      bullets.forEach(bullet=>{
        state[index+1].bullets.push({
          left: bullet.leftPos,
          top: bullet.topPos
        })
      })
    })
    socket.emit('update_state', RoomId, state)
  }

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
      if(players.length <= 1){
        window.location.href = '/victory'
      }
      // animate all the players and bullets
      players.forEach((player,index)=>{
        if(!player.isMain){
          changeState(player, index+1)
        }
        player.animate()
      })
      
      if(!isBulletsCreated){
        if(state[1].bullets.length >0){
          bullets.forEach((bullet, index)=>{
            let pos = state[1].bullets[index]
            bullet.createBullet(maze, pos)
          })
        }
        else{
          return
        }
        isBulletsCreated = true
      }
      bullets.forEach(bullet=>{
        bullet.animate()
      })
    }
  }

  startAnimate(fps)

  const changeState = (player, index)=>{
    player.leftPos = state[index].pos[0]
    player.topPos = state[index].pos[1]
    player.playerDiv.getElementsByClassName('sheet')[0].setAttribute('facing',state[index].direction.facing)
    player.playerDiv.getElementsByClassName('player-sprite')[0].setAttribute('moving',state[index].direction.moving)
    player.playerDiv.getElementsByClassName('player-sprite')[0].setAttribute('shoot',state[index].direction.shoot)
    player.hasBullet = state[index].bulletInfo.hasBullet
    player.playerBullet = bullets.filter(bullet=> bullet.bulletNum === state[index].bulletInfo.playerBullet)
    player.isShoot = state[index].bulletInfo.isShoot
  }

  const updateState = (player)=>{
    const index = player.playerNum
    state[index].pos[0] = player.leftPos+400
    state[index].pos[1] = player.topPos+400
    state[index].direction.facing = player.playerDiv.getElementsByClassName('sheet')[0].getAttribute('facing')
    state[index].direction.moving = player.playerDiv.getElementsByClassName('player-sprite')[0].getAttribute('moving')
    state[index].direction.shoot = player.playerDiv.getElementsByClassName('player-sprite')[0].getAttribute('shoot')
    state[index].bulletInfo.hasBullet = player.hasBullet
    if(player.hasBullet){
      state[index].bulletInfo.playerBullet = player.playerBullet[0].bulletNum
    }
    state[index].bulletInfo.isShoot = player.isShoot
    socket.emit('update_state', RoomId, state)
  }

  // Listenes for keydown and keyup events
  document.addEventListener("keydown",(e)=>{
      controller.movementHandler(e,true)
      updateState(controller.player)
  });
  document.addEventListener("keyup", (e)=>{
      controller.movementHandler(e,false)
      updateState(controller.player)
  })
}
