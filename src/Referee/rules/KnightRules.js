import { isSquareOccupied, isSquareOccupiedByOpponent } from "./GeneralRules";

export const isValidKnightMove = (fromX, fromY, toX, toY, team, pieceState) => {
  if (
    (Math.abs(toX - fromX) === 2 && Math.abs(toY - fromY) === 1) ||
    (Math.abs(toX - fromX) === 1 && Math.abs(toY - fromY) === 2)
  ) {
    return (
      !isSquareOccupied(toX, toY, pieceState) ||
      isSquareOccupiedByOpponent(toX, toY, pieceState, team)
    );
  }
  return false;
};
