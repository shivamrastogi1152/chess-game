import {
  isSquareOccupied,
  isSquareOccupiedByOpponent,
  withinBounds,
} from "./GeneralRules";

export const isValidBishopMove = (fromX, fromY, toX, toY, team, pieceState) => {
  const deltaX = Math.abs(toX - fromX);
  const deltaY = Math.abs(toY - fromY);
  const maxSteps = deltaX;

  // Diagonal Movement Check
  if (deltaX === deltaY) {
    const dirX = Math.sign(toX - fromX);
    const dirY = Math.sign(toY - fromY);

    for (let step = 1; step < maxSteps; step++) {
      const nextX = fromX + dirX * step;
      const nextY = fromY + dirY * step;

      // Check if any square between from and to is occupied
      if (isSquareOccupied(nextX, nextY, pieceState)) {
        // Obstruction found -> invalid move
        return false;
      }
    }

    // Check if the destination square is unoccupied or occupied by an opponent's piece
    return (
      !isSquareOccupied(toX, toY, pieceState) ||
      isSquareOccupiedByOpponent(toX, toY, pieceState, team)
    );
  }

  return false;
};

export const addPossibleMovesForBishop = (bishop, pieceState) => {
  const possibleMoves = [];

  const dir = [
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
  ];

  dir.forEach((d) => {
    for (let step = 1; step < 8; step++) {
      const nextX = bishop.x + d.x * step;
      const nextY = bishop.y + d.y * step;

      if (!withinBounds(nextX, nextY)) break;

      if (isSquareOccupiedByOpponent(nextX, nextY, pieceState, bishop.team)) {
        possibleMoves.push({ x: nextX, y: nextY });
        break;
      }

      if (isSquareOccupied(nextX, nextY, pieceState)) {
        break;
      }

      possibleMoves.push({ x: nextX, y: nextY });
    }
  });

  return possibleMoves;
};
