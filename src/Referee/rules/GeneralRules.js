const getPieceAtSquare = (x, y, pieceState) => {
  const piece = pieceState.find((p) => p.x === x && p.y === y);
  return piece;
};

export const isSquareOccupied = (toX, toY, pieceState) => {
  const piece = getPieceAtSquare(toX, toY, pieceState);
  return piece != null;
};

export const isSquareOccupiedByOpponent = (toX, toY, pieceState, team) => {
  const piece = getPieceAtSquare(toX, toY, pieceState);
  return piece != null && piece.team != team;
};
