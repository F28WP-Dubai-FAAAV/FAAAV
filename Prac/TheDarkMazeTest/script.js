const background = document.querySelector(".background");
const player = document.querySelector(".player");
const playerSheet = document.querySelector(".player-spriteSheet");
const camera = document.querySelector('.camera');
const playerHeight = player.offsetHeight;
const playerWidth = player.offsetWidth;
const backgroundHeight = background.clientHeight - playerHeight;
const backgroundWidth = background.clientWidth - playerWidth;
const maze1 = [
    ['000','001','002','003','004','001','002','003','004','005'],
    ['010','011','012','013','012','013','012','013','014','015'],
    ['020','021','022','023','022','023','022','023','024','025'],
    ['020','021','022','023','022','023','022','023','024','025'],
    ['020','021','022','023','022','023','022','023','024','025'],
    ['020','021','022','023','022','023','022','023','024','025'],
    ['020','021','022','023','022','023','022','023','024','015'],
    ['020','021','022','023','022','023','022','023','024','025'],
    ['030','031','032','033','032','033','032','033','034','035'],
    ['040','041','042','043','042','043','042','043','044','045'],
]

maze1.forEach((tileRow) =>{
    tileRow.forEach(tileColumn=>{
        let img = `tile${tileColumn}.png`;
        const imgTile = document.createElement('div');
        imgTile.classList.add("tile", "pixelart");
        imgTile.style.background = `url(./Dungeon_SpriteSheet_Split/${img}) no-repeat center`;
        imgTile.style.backgroundSize = "cover"; 
        background.appendChild(imgTile);
    })
})

player.style.top =  `calc(50% - ${player.offsetHeight/2}px)`
player.style.left = `calc(50% - ${player.offsetWidth/2}px)`

const step = 3;
let topPos = player.offsetTop,
  leftPos = player.offsetLeft;
const tile = document.querySelector('.tile');

camera.style.top = `calc(50% - ${camera.offsetHeight/2}px)`;
camera.style.left = `calc(50% - ${camera.offsetWidth/2}px)`;
background.style.clipPath = `circle(24% at ${leftPos+player.offsetWidth/2}px ${topPos+player.offsetHeight/2}px)`;

const keys = {
  38: 'up',
  37: 'left',
  39: 'right',
  40: 'down'
}

const keysHeld = []

const startMove = (key) => {
  if(!keysHeld.includes(key)){
    keysHeld.unshift(key)
  }
  if(keysHeld){
    switch(keysHeld[0]){
      case 'up':
        playerSheet.classList.add("up");
        if (topPos > tile.offsetHeight) {
          topPos -= step;
          player.style.top = topPos + "px";
        }
        break;
      case 'down':
        playerSheet.classList.add("down");
        if (topPos < backgroundHeight-tile.offsetHeight-10) {
          topPos += step;
          player.style.top = topPos + "px";
        }
        break;
      case 'left':
        playerSheet.classList.add("left");
        if (leftPos > tile.offsetWidth-15) {
          leftPos -= step;
          player.style.left = leftPos + "px";
        }
        break;
      case 'right':
        playerSheet.classList.add("right");
        if (leftPos < backgroundWidth-tile.offsetWidth+15) {
          leftPos += step;
          player.style.left = leftPos + "px";
        }
        break;
    }
  }
}

const movement = (e) => {
    const keyCode = e.keyCode;
    if(keyCode in keys){
        playerSheet.classList.remove(playerSheet.classList[2]);
        if(!playerSheet.classList.contains("move")){
            playerSheet.classList.add('move');
        }
    }

    switch (keyCode) {
      case 38:
        startMove(keys[38])
        break;
      case 40:
        startMove(keys[40])
        break;
      case 37:
        startMove(keys[37])
        break;
      case 39:
        startMove(keys[39])
        break;
    }

    camera.style.top = (topPos-(camera.offsetHeight/2)+player.offsetHeight/2) + "px";
    camera.style.left = (leftPos-(camera.offsetWidth/2)+player.offsetWidth/2) + "px";
    background.style.clipPath = 'none';
    background.style.clipPath = `circle(24% at ${leftPos+player.offsetWidth/2}px ${topPos+player.offsetHeight/2}px)`;

  };
  
  const stopMovement= (e) => {
    const keyCode = e.keyCode;
    if(keysHeld.includes(keys[keyCode])){
      keysHeld.splice(keysHeld.indexOf(keys[keyCode]),1)
    }
    if(keysHeld.length <= 0){
        if(playerSheet.classList.contains("move")){
            playerSheet.classList.remove('move');
        }
    }
  }

  document.addEventListener("keydown", movement);
  document.addEventListener("keyup", stopMovement);
