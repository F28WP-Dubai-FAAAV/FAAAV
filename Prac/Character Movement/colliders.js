const obstacles = document.querySelectorAll(".obstacle");

const walls = [];

obstacles.forEach((obstacle) => {
  walls.push(obstacle.getBoundingClientRect());
});

const getDistance = (x1, y1, x2, y2) => {
  const x = x1 - x2;
  const y = y1 - y2;

  return [x, y];
};

const collide = () => {
  const playerDimensions = player.getBoundingClientRect();

  obstacles.forEach((obstacle, index) => {
    const wallDimensions = walls[index];
    const distance = getDistance(
      playerDimensions.x,
      playerDimensions.y,
      wallDimensions.x,
      wallDimensions.y
    );
  });
};

const frames = setInterval(collide, 20);

window.addEventListener("resize", () => {
  walls.length = 0;
  obstacles.forEach((obstacle) => {
    walls.push(obstacle.getBoundingClientRect());
  });
});
