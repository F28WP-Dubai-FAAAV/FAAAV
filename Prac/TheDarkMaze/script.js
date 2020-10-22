const background = document.querySelector(".background");
const player = document.querySelector(".player");
const playerSheet = document.querySelector(".player-spriteSheet");
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

maze1.forEach((tileRow, rowIndex) =>{
    tileRow.forEach(tileColumn=>{
        let img = `tile${tileColumn}.png`;
        const imgTile = document.createElement('div');
        imgTile.classList.add("tile", "pixelart");
        imgTile.style.background = `url(./Dungeon_SpriteSheet_Split/${img}) no-repeat center`;
        imgTile.style.backgroundSize = "cover"; 
        if(rowIndex === maze1.length-1){
            imgTile.style.zIndex = 100;
        }
        background.appendChild(imgTile);
    })
})

player.style.top =  `calc(50% - ${player.offsetHeight/2}px)`
player.style.left = `calc(50% - ${player.offsetWidth/2}px)`

const step = 3;
let topPos = player.offsetTop,
  leftPos = player.offsetLeft;
const tile = document.querySelector('.tile');

const movement = (e) => {
    const key = e.key;
    if(key==="ArrowUp" || key==="ArrowDown" || key==="ArrowLeft"|| key==="ArrowRight"){
        playerSheet.classList.remove(playerSheet.classList[2]);
        if(!playerSheet.classList.contains("move")){
            playerSheet.classList.add('move');
        }
    }
    switch (key) {
      case "ArrowUp":
        playerSheet.classList.add("up");
        if (topPos > tile.offsetHeight) {
          topPos -= step;
          player.style.top = topPos + "px";
        }
        break;
      case "ArrowDown":
        playerSheet.classList.add("down");
        if (topPos < backgroundHeight-tile.offsetHeight+5) {
          topPos += step;
          player.style.top = topPos + "px";
        }
        break;
      case "ArrowLeft":
        playerSheet.classList.add("left");
        if (leftPos > tile.offsetWidth-15) {
          leftPos -= step;
          player.style.left = leftPos + "px";
        }
        break;
      case "ArrowRight":
        playerSheet.classList.add("right");
        if (leftPos < backgroundWidth-tile.offsetWidth+15) {
          leftPos += step;
          player.style.left = leftPos + "px";
        }
        break;
    }
  };
  
  function stopMovement(e){
    const key = e.key;
    if(key==="ArrowUp" || key==="ArrowDown" || key==="ArrowLeft"|| key==="ArrowRight"){
        if(playerSheet.classList.contains("move")){
            playerSheet.classList.remove('move');
        }
    }
  }

  document.addEventListener("keydown", movement);
  document.addEventListener("keyup", stopMovement);
