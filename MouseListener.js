class MouseListener {
  constructor(gameManager) {
    this.canvas = gameManager.canvas;
    this.gameManager = gameManager;
    this.clickX = 0;
    this.clickY = 0;

    this.canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e));
  }

  handleMouseDown(e) {
    if (!this.gameManager.winner) {
      const clientX = e.offsetX;
      const clientY = e.offsetY;

      // Calculate the canvas coordinates from click coordinates
      this.clickX = clientX;
      this.clickY = clientY;

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

        if (this.isclickInsidePiece(positionX, positionY, pieceSize)) {
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
      const tileclicked = gameTiles.find((tile) =>
        this.isclickInsideTile(tile, tileSize)
      );

      if (tileclicked && tileclicked.highlighted) {
        this.gameManager.Pieces.movePiece(
          pieceIndex,
          tileclicked.row,
          tileclicked.column
        );
      } else {
        piece.selected = false;
      }
    }
  }

  isclickInsidePiece(positionX, positionY, pieceSize) {
    return (
      this.clickX >= positionX &&
      this.clickX <= positionX + pieceSize &&
      this.clickY >= positionY &&
      this.clickY <= positionY + pieceSize
    );
  }

  isclickInsideTile(tile, tileSize) {
    const positionX = tile.column * (gameDimensions / 8) + 5;
    const positionY = tile.row * (gameDimensions / 8) + 5;

    return (
      this.clickX >= positionX &&
      this.clickX <= positionX + tileSize &&
      this.clickY >= positionY &&
      this.clickY <= positionY + tileSize
    );
  }
}
