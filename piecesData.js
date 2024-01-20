const pieceImages = {
  player1: {
    Rook: new Image(),
    Knight: new Image(),
    Bishop: new Image(),
    Queen: new Image(),
    King: new Image(),
    Pawn: new Image(),
  },
  player2: {
    Rook: new Image(),
    Knight: new Image(),
    Bishop: new Image(),
    Queen: new Image(),
    King: new Image(),
    Pawn: new Image(),
  },
};

pieceImages.player1.Bishop.src = "./Resources/b_bishop_1x.png";
pieceImages.player1.King.src = "./Resources/b_king_1x.png";
pieceImages.player1.Knight.src = "./Resources/b_knight_1x.png";
pieceImages.player1.Pawn.src = "./Resources/b_pawn_1x.png";
pieceImages.player1.Queen.src = "./Resources/b_queen_1x.png";
pieceImages.player1.Rook.src = "./Resources/b_rook_1x.png";

pieceImages.player2.Bishop.src = "./Resources/w_bishop_1x.png";
pieceImages.player2.King.src = "./Resources/w_king_1x.png";
pieceImages.player2.Knight.src = "./Resources//w_knight_1x.png";
pieceImages.player2.Pawn.src = "./Resources/w_pawn_1x.png";
pieceImages.player2.Queen.src = "./Resources/w_queen_1x.png";
pieceImages.player2.Rook.src = "./Resources/w_rook_1x.png";
