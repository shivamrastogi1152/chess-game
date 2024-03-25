class Piece {
  constructor(
    x,
    y,
    imgSrc,
    pieceType,
    team,
    enPassant = false,
    possibleMoves = []
  ) {
    this.x = x;
    this.y = y;
    this.imgSrc = imgSrc;
    this.pieceType = pieceType;
    this.team = team;
    this.enPassant = enPassant;
    this.possibleMoves = possibleMoves;
  }
}

export default Piece;
