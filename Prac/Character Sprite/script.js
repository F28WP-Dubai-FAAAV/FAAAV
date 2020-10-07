const characterSheet = document.querySelector(".character-spritesheet");

window.addEventListener("keydown", (e) => {
  const key = e.key;
  characterSheet.classList.remove(characterSheet.classList[2]);
  switch (e.key) {
    case "ArrowUp":
      characterSheet.classList.add("up");
      break;
    case "ArrowDown":
      characterSheet.classList.add("down");
      break;
    case "ArrowLeft":
      characterSheet.classList.add("left");
      break;
    case "ArrowRight":
      characterSheet.classList.add("right");
      break;
  }
});
