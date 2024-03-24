import { isSquareOccupied, isSquareOccupiedByOpponent } from "./GeneralRules";

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
