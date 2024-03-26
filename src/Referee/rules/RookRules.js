import {
  isSquareOccupied,
  isSquareOccupiedByOpponent,
  withinBounds,
} from "./GeneralRules";

export const isValidRookMove = (fromX, fromY, toX, toY, team, pieceState) => {
  const deltaX = Math.abs(toX - fromX);
  const deltaY = Math.abs(toY - fromY);

  // Check if the move is either purely horizontal or purely vertical
  if ((deltaX === 0 && deltaY !== 0) || (deltaX !== 0 && deltaY === 0)) {
    const dirX = Math.sign(toX - fromX);
    const dirY = Math.sign(toY - fromY);
    const maxSteps = Math.max(deltaX, deltaY);

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

export const addPossibleMovesForRook = (rook, pieceState) => {
  const possibleMoves = [];

  const dir = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  dir.forEach((d) => {
    for (let step = 1; step < 8; step++) {
      const nextX = rook.x + d.x * step;
      const nextY = rook.y + d.y * step;

      if (!withinBounds(nextX, nextY)) break;

      if (isSquareOccupiedByOpponent(nextX, nextY, pieceState, rook.team)) {
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
