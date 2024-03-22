class Piece {
  constructor(x, y, imgSrc, pieceType, team, enPassant) {
    this.x = x;
    this.y = y;
    this.imgSrc = imgSrc;
    this.pieceType = pieceType;
    this.team = team;
    this.enPassant = enPassant;
  }
}

export default Piece;
