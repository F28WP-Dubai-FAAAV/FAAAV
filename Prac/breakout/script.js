const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 800;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 5,
  speedY: 4,
};

const paddle = {
  height: 15,
  width: 100,
  x: canvas.width / 2,
  y: canvas.height - 35,
  speedX: 0,
};

const brick = {
  height: 20,
  width: 50,
  x: 20,
  y: 75,
};

const bricksMatrix = [];

for (let i = 0; i < 4; i++) {
  bricksMatrix.push([]);
  for (let j = 0; j < (canvas.width - 100) / brick.width; j++) {
    drawBrick(j * (brick.width + 5), i * (brick.height + 5));
    bricksMatrix[i].push(1);
  }
}

function gameOver() {
  if (ball.y + ball.radius >= canvas.height) {
    ball.x = Math.floor(Math.random() * canvas.width);
    ball.y = canvas.height / 2;
    ball.speedX *= -1;
    ball.speedY *= -1;
  }
}

function collideBall() {
  if (ball.y - ball.radius < 0) {
    ball.speedY *= -1;
  } else if (ball.x + ball.radius >= canvas.width) {
    ball.speedX *= -1;
  } else if (ball.x - ball.radius < 0) {
    ball.speedX *= -1;
  }

  if (
    ball.x + ball.radius > paddle.x &&
    ball.x + ball.radius < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y &&
    ball.y + ball.radius < paddle.y + paddle.height
  ) {
    ball.speedY *= -1;
  }
}

function drawBall() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  ctx.fill();
}

function collidePaddle() {
  if (paddle.x < 0) {
    paddle.x = 0;
  } else if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

function drawPaddle() {
  ctx.fillStyle = "skyblue";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBrick(distance, height) {
  ctx.fillStyle = "#801e1e";
  ctx.fillRect(brick.x + distance, brick.y + height, brick.width, brick.height);
}

function draw() {
  drawBall();
  drawPaddle();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < (canvas.width - 100) / brick.width; j++) {
      if (bricksMatrix[i][j] === 1) {
        drawBrick(j * (brick.width + 5), i * (brick.height + 5));
      }
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  collideBall();
  collidePaddle();
  gameOver();
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  paddle.x += paddle.speedX;
  requestAnimationFrame(update);
}

update();

const keyDown = (e) => {
  switch (e.key) {
    case "ArrowLeft":
      paddle.speedX = -10;
      break;
    case "ArrowRight":
      paddle.speedX = 10;
      break;
  }
};

const keyUp = (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    paddle.speedX = 0;
  }
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
