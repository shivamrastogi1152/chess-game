import { isSquareOccupied, isSquareOccupiedByOpponent } from "./GeneralRules";

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
