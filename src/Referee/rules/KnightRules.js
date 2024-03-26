import {
  isSquareOccupied,
  isSquareOccupiedByOpponent,
  withinBounds,
} from "./GeneralRules";

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

export const addPossibleMovesForKnight = (knight, pieceState) => {
  const possibleMoves = [];
  const dir = [
    { x: 1, y: 2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: 2, y: 1 },
    { x: -2, y: 1 },
    { x: 2, y: -1 },
    { x: -2, y: -1 },
  ];

  dir.forEach((d) => {
    const nextX = knight.x + d.x;
    const nextY = knight.y + d.y;

    if (
      withinBounds(nextX, nextY) &&
      (!isSquareOccupied(nextX, nextY, pieceState) ||
        isSquareOccupiedByOpponent(nextX, nextY, pieceState, knight.team))
    )
      possibleMoves.push({ x: nextX, y: nextY });
  });
  return possibleMoves;
};
