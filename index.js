const gameCanvas = document.querySelector("canvas");

const ctx = gameCanvas.getContext("2d");
let gameWidth;
let gameHeight;
const customFont = new FontFace(
  "CustomFont",
  "url(./Resources/PressStart2P-Regular.ttf"
);
customFont.load().then(() => {
  document.fonts.add(customFont);
});

getCanvasDimensions();

addEventListener("resize", getCanvasDimensions);

const GameManage = new GameManager();

function getCanvasDimensions() {
  gameDimensions = innerWidth - 10;
  if (innerHeight - 30 < gameDimensions) {
    gameDimensions = innerHeight - 40;
  }
  gameCanvas.width = gameDimensions;
  gameCanvas.height = gameDimensions;
}

function animate() {
  GameManage.animate();
  requestAnimationFrame(animate);
}
animate();
