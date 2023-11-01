class TouchListener {
  constructor(gameManager) {
    this.canvas = gameManager.canvas;
    this.gameManager = gameManager;
    this.touchX = 0;
    this.touchY = 0;

    this.canvas.addEventListener("touchstart", (e) => this.handleTouchStart(e));
  }

  handleTouchStart(e) {
    if (!this.gameManager.winner) {
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;

      const canvasRect = this.canvas.getBoundingClientRect();

      // Calculate the canvas coordinates from touch coordinates
      this.touchX = clientX - canvasRect.left;
      this.touchY = clientY - canvasRect.top;

      const gameTiles = this.gameManager.GameBody.tiles;
      const piecesData = this.gameManager.Pieces.playerPieces;

      if (gameTiles.every((tile) => !tile.highlighted)) {
        this.selectPiece(piecesData);
      } else {
        this.movePiece(piecesData, gameTiles);
      }
    }
  }

  selectPiece(piecesData) {
    const playerTurn = this.gameManager.playerTurn;
    piecesData[playerTurn].forEach((piece) => {
      const gameDimensions = this.gameManager.gameDimensions;
      const pieceSize = gameDimensions / 8 - 4;
      if (piece.visible) {
        const positionX = piece.column * (gameDimensions / 8) + 5;
        const positionY = piece.row * (gameDimensions / 8) + 5;

        if (this.isTouchInsidePiece(positionX, positionY, pieceSize)) {
          piece.selected = true;
        }
      }
    });
  }

  movePiece(piecesData, gameTiles) {
    const playerTurn = this.gameManager.playerTurn;
    const gameDimensions = this.gameManager.gameDimensions;
    const tileSize = (gameDimensions - 10) / 8;
    const pieceIndex = piecesData[playerTurn].findIndex(
      (piece) => piece.selected
    );

    if (pieceIndex >= 0) {
      const piece = piecesData[playerTurn][pieceIndex];
      const tileTouched = gameTiles.find((tile) =>
        this.isTouchInsideTile(tile, tileSize)
      );

      if (tileTouched && tileTouched.highlighted) {
        this.gameManager.Pieces.movePiece(
          pieceIndex,
          tileTouched.row,
          tileTouched.column
        );
      } else {
        piece.selected = false;
      }
    }
  }

  isTouchInsidePiece(positionX, positionY, pieceSize) {
    return (
      this.touchX >= positionX &&
      this.touchX <= positionX + pieceSize &&
      this.touchY >= positionY &&
      this.touchY <= positionY + pieceSize
    );
  }

  isTouchInsideTile(tile, tileSize) {
    const positionX = tile.column * (gameDimensions / 8) + 5;
    const positionY = tile.row * (gameDimensions / 8) + 5;

    return (
      this.touchX >= positionX &&
      this.touchX <= positionX + tileSize &&
      this.touchY >= positionY &&
      this.touchY <= positionY + tileSize
    );
  }
}
