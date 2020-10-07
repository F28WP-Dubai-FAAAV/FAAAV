const mazeWalls = [];

mazeWalls.forEach((w) => {
  const wall = document.createElement("div");
  wall.classList.add(`obstacle`, `wall${w.wallId}`);
  playground.appendChild(wall);
  const wallStyle = document.querySelector(`.wall${w.wallId}`);
  wallStyle.style.cssText = w.styles;
});
