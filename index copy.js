const imagePicker = document.getElementById("imagePicker");
const gameCanvas = document.querySelector("canvas");
const gameImage = new Image();

const ctx = gameCanvas.getContext("2d");
let gameWidth;
let gameHeight;
getCanvasDimensions();

addEventListener("resize", getCanvasDimensions);

const GameManage = new GameManager();

imagePicker.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    if (file.type.includes("image")) {
      const imageURL = URL.createObjectURL(file);
      gameImage.src = imageURL;
      gameImage.onload = () => {
        GameManage.Tiles = new Tiles(GameManage);
      };
    }
  }
});

function getCanvasDimensions() {
  if (innerWidth < 371) {
    gameWidth = innerWidth - 10;
  } else {
    gameWidth = 360;
  }
  gameHeight = ((gameWidth - 10) / 4) * 7 + 10;
  if (innerHeight - 30 < gameHeight) {
    gameHeight = innerHeight - 40;
    gameWidth = (gameHeight / 7) * 4 - 10;
  }
  gameCanvas.width = gameWidth;
  gameCanvas.height = gameHeight;
}

function animate() {
  GameManage.animate();
  requestAnimationFrame(animate);
}
animate();
