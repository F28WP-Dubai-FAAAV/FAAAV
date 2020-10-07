const player = document.querySelector(".player");
const playground = document.querySelector(".playground");
const playerHeight = player.offsetHeight;
const playerWidth = player.offsetWidth;
const playgroundHeight = playground.clientHeight - playerHeight;
const playgroundWidth = playground.clientWidth - playerWidth;
const step = 30;

let moveUp = true,
  moveDown = true,
  moveLeft = true,
  moveRight = true;

let topPos = 0,
  downPos = 0,
  rightPos = 0,
  leftPos = 0;

const movement = (e) => {
  const key = e.key;

  switch (key) {
    case "ArrowUp":
      if (topPos > 0 && moveUp) {
        topPos -= step;
        player.style.top = topPos + "px";
      }
      break;
    case "ArrowDown":
      if (topPos < playgroundHeight && moveDown) {
        topPos += step;
        player.style.top = topPos + "px";
      }
      break;
    case "ArrowLeft":
      if (leftPos > 0 && moveLeft) {
        leftPos -= step;
        player.style.left = leftPos + "px";
      }
      break;
    case "ArrowRight":
      if (leftPos < playgroundWidth && moveRight) {
        leftPos += step;
        player.style.left = leftPos + "px";
      }
      break;
  }
};

document.addEventListener("keydown", movement);
