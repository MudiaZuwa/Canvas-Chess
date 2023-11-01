class Pieces {
  constructor(gameManager) {
    this.gameManager = gameManager;

    const piecesOrder = [
      "Rook",
      "Knight",
      "Bishop",
      "Queen",
      "King",
      "Bishop",
      "Knight",
      "Rook",
    ];

    this.pieceImages = pieceImages;

    this.playerPieces = {
      player1: [],
      player2: [],
    };
    this.selectedPiece;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        switch (row) {
          case 0:
            this.playerPieces.player2.push({
              row,
              column: col,
              piece: piecesOrder[col],
              visible: true,
              selected: false,
            });
            break;
          case 7:
            this.playerPieces.player1.push({
              row,
              column: col,
              piece: piecesOrder[col],
              visible: true,
              selected: false,
            });
            break;
          case 1:
            this.playerPieces.player2.push({
              row,
              column: col,
              piece: "Pawn",
              visible: true,
              moved: false,
              selected: false,
            });
            break;
          case 6:
            this.playerPieces.player1.push({
              row,
              column: col,
              piece: "Pawn",
              visible: true,
              selected: false,
            });
            break;
        }
      }
    }
  }

  animate() {
    const gameDimensions = this.gameManager.gameDimensions;
    const pieceSize = gameDimensions / 8 - 4;

    Object.keys(this.playerPieces).forEach((player) => {
      this.playerPieces[player].forEach((piece) => {
        if (piece.visible)
          ctx.drawImage(
            this.pieceImages[player][piece["piece"]],
            piece.column * (gameDimensions / 8) + 5,
            piece.row * (gameDimensions / 8) + 5,
            pieceSize,
            pieceSize
          );
      });
    });
  }

  movePiece(pieceIndex, newRow, newColumn) {
    this.gameManager.GameBody.tiles.forEach((tile) => {
      if (tile.highlighted) tile.highlighted = false;
      if (tile.check) tile.check = false;
    });
    const playerTurn = this.gameManager.playerTurn;
    const opponent = playerTurn === "player1" ? "player2" : "player1";
    const opponentPieces = this.playerPieces[opponent];
    const opponentPieceIndex = opponentPieces.findIndex(
      (piece) => piece.row === newRow && piece.column === newColumn
    );
    if (opponentPieceIndex >= 0) {
      this.playerPieces[opponent][opponentPieceIndex].visible = false;
      const targetPiece = opponentPieces[opponentPieceIndex];
      if (targetPiece.piece === "King") {
        this.gameManager.winner = playerTurn;
        return;
      }
    }
    this.playerPieces[playerTurn][pieceIndex].row = newRow;
    this.playerPieces[playerTurn][pieceIndex].column = newColumn;
    this.playerPieces[playerTurn][pieceIndex].selected = false;
    if (this.playerPieces[playerTurn][pieceIndex].piece === "Pawn")
      this.playerPieces[playerTurn][pieceIndex].moved = true;

    if (playerTurn === "player1") this.gameManager.playerTurn = "player2";
    else this.gameManager.playerTurn = "player1";
  }
}
