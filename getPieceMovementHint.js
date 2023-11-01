let gameData;

// Function to get possible movement hints for the selected piece
const getPieceMovementHint = (data) => {
  const gameTiles = data.GameBody.tiles;
  const piecesData = data.Pieces;
  gameData = data;

  // Clear previous highlights
  gameTiles.forEach((tile) => (tile.highlighted = false));

  // Find highlighted tiles for the selected piece(s)
  const playerTurn = data.playerTurn;
  const opponent = playerTurn === "player1" ? "player2" : "player1";
  Object.keys(piecesData.playerPieces).forEach((player) => {
    piecesData.playerPieces[player].forEach((piece) => {
      const row = piece.row;
      const column = piece.column;
      let possibleMoves = [];
      let highlightedTiles = [];

      switch (piece.piece) {
        case "Rook":
          possibleMoves.push(
            ...getTilesInDirection(row, column, [
              [-1, 0], // Up
              [1, 0], // Down
              [0, -1], // Left
              [0, 1], // Right
            ])
          );
          break;
        case "Bishop":
          possibleMoves.push(
            ...getTilesInDirection(row, column, [
              [-1, -1], // Up Left
              [-1, 1], // Up Right
              [1, -1], // Down Left
              [1, 1], // Down Right
            ])
          );
          break;
        case "Pawn":
          possibleMoves.push(
            ...getPawnMoves(row, column, playerTurn, piecesData)
          );
          break;
        case "Knight":
          possibleMoves.push(
            ...getKnightMoves(row, column, playerTurn, piecesData)
          );
          break;
        case "Queen":
          possibleMoves.push(
            ...getTilesInDirection(row, column, [
              [-1, 0], // Up
              [1, 0], // Down
              [0, -1], // Left
              [0, 1], // Right
              [-1, -1], // Up Left
              [-1, 1], // Up Right
              [1, -1], // Down Left
              [1, 1], // Down Right
            ])
          );
          break;
        case "King":
          possibleMoves.push(
            ...getTilesInDirection(
              row,
              column,
              [
                [-1, 0], // Up
                [1, 0], // Down
                [0, -1], // Left
                [0, 1], // Right
                [-1, -1], // Up Left
                [-1, 1], // Up Right
                [1, -1], // Down Left
                [1, 1], // Down Right
              ],
              1
            )
          );
          break;
      }

      // Add the possible moves to the highlightedTiles array
      highlightedTiles.push(...possibleMoves);
      if (piece.selected === true) {
        if (highlightedTiles.length === 0) {
          piecesData.playerPieces[playerTurn].forEach(
            (piece) => (piece.selected = false)
          );
        }

        // Mark the highlighted tiles
        highlightedTiles.forEach((highlightedTile) => {
          const highlightTileIndex = gameTiles.findIndex(
            (tile) =>
              tile.row === highlightedTile.row &&
              tile.column === highlightedTile.column
          );
          gameTiles[highlightTileIndex].highlighted = true;
        });
      } else if (player === opponent) {
        highlightedTiles.forEach((tile) => {
          const playerPieces = piecesData.playerPieces[playerTurn];
          const checkmateCondition = playerPieces.some(
            (Playerpiece) =>
              Playerpiece.row === tile.row &&
              Playerpiece.column === tile.column &&
              Playerpiece.piece === "King"
          );
          if (checkmateCondition) {
            const highlightTileIndex = gameTiles.findIndex(
              (tile) =>
                tile.row === highlightedTile.row &&
                tile.column === highlightedTile.column
            );
            gameTiles[highlightTileIndex].check = true;
            gameTiles[highlightTileIndex].highlighted = false;
          }
        });
      }
    });
  });
};

// Function to get possible moves in a specific direction
const getTilesInDirection = (
  startRow,
  startCol,
  directions,
  step = 8,
  piece
) => {
  const tilesInDirection = [];
  const piecesData = gameData.Pieces;
  const playerTurn = gameData.playerTurn;
  const playerPieces = piecesData.playerPieces[playerTurn];
  const opponent = playerTurn === "player1" ? "player2" : "player1";
  const opponentPieces = piecesData.playerPieces[opponent];

  directions.forEach((dir) => {
    let currentRow = startRow;
    let currentCol = startCol;
    let currentStep = 0;
    let reachedOpponent = false;

    while (currentStep < step) {
      currentRow += dir[0];
      currentCol += dir[1];

      if (!isValidPosition(currentRow, currentCol, playerPieces)) {
        break; // Stop if the move reaches the edge/corner of the chessboard
      }

      const targetTilePiece = getPieceOnTile(
        currentRow,
        currentCol,
        piecesData
      );

      if (targetTilePiece) {
        if (opponentPieces.includes(targetTilePiece)) {
          // If an opponent piece is found, add the tile and stop the loop
          if (targetTilePiece.piece !== "Pawn" || dir[0] !== 0) {
            tilesInDirection.push({ row: currentRow, column: currentCol });
          }
          reachedOpponent = true;
          break;
        } else {
          // If an ally piece is found, stop the loop
          break;
        }
      }

      tilesInDirection.push({ row: currentRow, column: currentCol });
      currentStep++;
    }
  });

  return tilesInDirection;
};

// Function to get the piece on a specific tile
const getPieceOnTile = (row, col, piecesData) => {
  const playerPieces = piecesData.playerPieces;
  for (const player in playerPieces) {
    for (const piece of playerPieces[player]) {
      if (piece.row === row && piece.column === col && piece.visible) {
        return piece;
      }
    }
  }
  return null;
};

// Function to get possible moves for a Pawn
const getPawnMoves = (row, column, playerTurn, piecesData) => {
  const step = piecesData.playerPieces[playerTurn].some(
    (piece) => piece.row === row && piece.column === column && piece.moved
  )
    ? 1
    : 2;

  const dir = playerTurn === "player1" ? -1 : 1;
  const frontTiles = getTilesInDirection(row, column, [[dir, 0]], step);

  const playerPieces = piecesData.playerPieces[playerTurn];
  const opponent = playerTurn === "player1" ? "player2" : "player1";
  const opponentPieces = piecesData.playerPieces[opponent];

  const diagonal = [
    [dir, -1],
    [dir, 1],
  ];
  const diagonalMoves = diagonal
    .filter((tile) => {
      const newRow = row + tile[0];
      const newColumn = column + tile[1];
      return (
        isValidPosition(newRow, newColumn, playerPieces) &&
        opponentPieces.includes(getPieceOnTile(newRow, newColumn, piecesData))
      );
    })
    .map((tile) => ({ row: row + tile[0], column: column + tile[1] }));

  return [...frontTiles, ...diagonalMoves];
};

// Function to get possible moves for a Knight
const getKnightMoves = (row, column, playerTurn, piecesData) => {
  const playerPieces = piecesData.playerPieces[playerTurn];
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  return moves
    .filter((tile) =>
      isValidPosition(row + tile[0], column + tile[1], playerPieces)
    )
    .map((tile) => ({ row: row + tile[0], column: column + tile[1] }));
};

// Function to check if a position is valid
const isValidPosition = (row, col, playerPieces) => {
  return (
    row >= 0 &&
    row < 8 &&
    col >= 0 &&
    col < 8 &&
    !playerPieces.some(
      (piece) => piece.row === row && piece.column === col && piece.visible
    )
  );
};
