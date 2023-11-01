class GameBody {
  constructor(GameManager) {
    this.GameManager = GameManager;
    this.lightImage = new Image();
    this.darkImage = new Image();
    this.highlightedImage = new Image();

    this.lightImage.src = "./Resources/square brown light_2x.png";
    this.darkImage.src = "./Resources/square brown dark_2x.png";
    this.highlightedImage.src = "./Resources/square gray light _2x.png";
    this.tiles = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        this.tiles.push({
          row,
          column: col,
          highlighted: false,
          check: false,
        });
      }
    }
  }

  animate() {
    const gameDimensions = this.GameManager.gameDimensions;

    //Aninimate Background/ |Bottom Frame
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, gameDimensions, gameDimensions);

    //Animate Board Patterns
    const tileSize = (gameDimensions - 10) / 8;
    this.tiles.forEach((tile) => {
      const isLight = (tile.row + tile.column) % 2 === 0;
      let tileImage = isLight ? this.lightImage : this.darkImage;
      ctx.drawImage(
        tileImage,
        tile.column * tileSize + 5,
        tile.row * tileSize + 5,
        tileSize,
        tileSize
      );

      if (tile.highlighted || tile.check) {
        const imageData = ctx.getImageData(
          tile.column * tileSize + 5,
          tile.row * tileSize + 5,
          tileSize,
          tileSize
        );
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          if (tile.check) {
            data[i] = 255;
            data[i + 1] = 0;
            data[i + 2] = 0;
          } else {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            const greyValue = (red + green + blue) / 3;

            data[i] = greyValue;
            data[i + 1] = greyValue;
            data[i + 2] = greyValue;
          }
        }

        ctx.putImageData(
          imageData,
          tile.column * tileSize + 5,
          tile.row * tileSize + 5
        );
        // const centerX = tile.column * tileSize + 5 / 2 + tileSize / 2;
        // const centerY = tile.row * tileSize + 5 / 2 + tileSize / 2;
        // const radius = tileSize / 6;

        // ctx.beginPath();
        // ctx.moveTo(centerX + radius, centerY);

        // for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
        //   const x = centerX + radius * Math.cos(angle);
        //   const y = centerY + radius * Math.sin(angle);
        //   ctx.lineTo(x, y);
        // }
        // ctx.lineWidth = 3; // Adjust the value to make the line bolder
        // ctx.strokeStyle = "white";

        // ctx.closePath();
        // ctx.stroke();
      }
    });
  }
}
