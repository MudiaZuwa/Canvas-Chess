class MouseListener {
  constructor(gameManager) {
    this.canvas = gameManager.canvas;
    this.gameManager = gameManager;
    var clickX = 0;
    var clickY = 0;
    this.canvas.addEventListener("mousedown", (e) => {
      const gameDimensions = this.gameManager.gameDimensions;
      const pieceSize = gameDimensions / 8 - 4;
      const tileSize = (gameDimensions - 10) / 8;
      const clientX = e.offsetX;
      const clientY = e.offsetY;

      const canvasRect = this.canvas.getBoundingClientRect();

      // Calculate the canvas coordinates from touch coordinates
      touchX = clientX;
      touchY = clientY;

      const gameTiles = this.gameManager.GameBody.tiles;
      const piecesData = this.gameManager.Pieces.playerPieces;
      if (gameTiles.every((tile) => !tile.highlighted)) {
        Object.keys(piecesData).forEach((player) => {
          if (this.gameManager.playerTurn === player) {
            piecesData[player].forEach((piece) => {
              const positionX = piece.column * (gameDimensions / 8) + 5;
              const positionY = piece.row * (gameDimensions / 8) + 5;

              // Check if the touch is inside the shape
              if (
                touchX >= positionX &&
                touchX <= positionX + pieceSize &&
                touchY >= positionY &&
                touchY <= positionY + pieceSize
              ) {
                // Start dragging the shape
                piece.selected = true;
              }
            });
          }
        });
      } else {
        const pieceIndex = piecesData[this.gameManager.playerTurn].findIndex(
          (piece) => piece.selected
        );
        const tileTouched = gameTiles.find((tile) => {
          const positionX = tile.column * (gameDimensions / 8) + 5;
          const positionY = tile.row * (gameDimensions / 8) + 5;

          // Check if the touch is inside the shape
          return (
            touchX >= positionX &&
            touchX <= positionX + tileSize &&
            touchY >= positionY &&
            touchY <= positionY + tileSize
          );
        });
        if (tileTouched.highlighted) {
          this.gameManager.Pieces.movePiece(
            pieceIndex,
            tileTouched.row,
            tileTouched.column
          );
        } else {
          this.gameManager.Pieces.playerPieces[this.gameManager.playerTurn][
            pieceIndex
          ].selected = false;
          this.gameManager.GameBody.tiles.forEach((tile) => {
            if (tile.highlighted) tile.highlighted = false;
          });
        }
      }
    });
  }
}
