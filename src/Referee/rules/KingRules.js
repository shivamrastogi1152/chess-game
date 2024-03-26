import {
  isSquareOccupied,
  isSquareOccupiedByOpponent,
  withinBounds,
} from "./GeneralRules";

export const isValidKingMove = (fromX, fromY, toX, toY, team, pieceState) => {
  const deltaX = Math.abs(toX - fromX);
  const deltaY = Math.abs(toY - fromY);

  // TO DO: Check if king is moving into danger
  return (
    deltaX <= 1 &&
    deltaY <= 1 &&
    (!isSquareOccupied(toX, toY, pieceState) ||
      isSquareOccupiedByOpponent(toX, toY, pieceState, team))
  );
};

export const addPossibleMovesForKing = (king, pieceState) => {
  const possibleMoves = [];

  const dir = [
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  dir.forEach((d) => {
    const nextX = king.x + d.x * 1;
    const nextY = king.y + d.y * 1;

    if (
      withinBounds(nextX, nextY) &&
      (!isSquareOccupied(nextX, nextY, pieceState) ||
        isSquareOccupiedByOpponent(nextX, nextY, pieceState, king.team))
    ) {
      possibleMoves.push({ x: nextX, y: nextY });
    }
  });

  return possibleMoves;
};
