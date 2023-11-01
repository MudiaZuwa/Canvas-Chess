class GameManager {
  constructor() {
    this.ctx = ctx;
    this.canvas = gameCanvas;
    this.gameDimensions = gameDimensions;
    this.GameBody = new GameBody(this);
    this.Pieces = new Pieces(this);
    this.touchListener = new TouchListener(this);
    this.mouseListener = new MouseListener(this);
    this.playerTurn = "player1";
  }

  animate() {
    this.ctx.clearRect(0, 0, this.gameDimensions, this.gameDimensions);
    this.GameBody.animate();
    this.Pieces.animate();
    if (this.GameBody) getPieceMovementHint(this);
    if (this.winner) {
      this.ctx.font = "32px CustomFont"; // Replace '32px' with your desired font size
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "black"; // Replace 'black' with your desired text color

      const text = `${this.winner} wins`;
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;

      this.ctx.fillText(text, x, y);
    }
  }
}
