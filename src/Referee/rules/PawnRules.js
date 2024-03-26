import TeamType from "../../utils/TeamType";
import PieceType from "../../utils/PieceType";
import {
  isSquareOccupied,
  isSquareOccupiedByOpponent,
  getPieceAtSquare,
} from "./GeneralRules";

export const isValidPawnMove = (fromX, fromY, toX, toY, team, pieceState) => {
  const firstRank = team === TeamType.WHITE ? 1 : 6;
  const dirY = team === TeamType.WHITE ? 1 : -1;

  //Pawn Movement Logic
  if (
    fromX === toX &&
    toY - fromY === dirY &&
    !isSquareOccupied(toX, toY, pieceState)
  ) {
    return true;
  } else if (
    fromY === firstRank &&
    fromX === toX &&
    toY - fromY === 2 * dirY &&
    !isSquareOccupied(toX, toY - dirY, pieceState) &&
    !isSquareOccupied(toX, toY, pieceState)
  ) {
    return true;
  }

  //Pawn Attack (En passant is handled separately)
  if (
    Math.abs(fromX - toX) === 1 &&
    toY - fromY === dirY &&
    isSquareOccupiedByOpponent(toX, toY, pieceState, team)
  ) {
    return true;
  }

  return false;
};

export const addPossibleMovesForPawn = (pawn, pieceState) => {
  const firstRank = pawn.team === TeamType.WHITE ? 1 : 6;
  const dirY = pawn.team === TeamType.WHITE ? 1 : -1;

  const possibleMoves = [];

  if (
    pawn.y === firstRank &&
    !isSquareOccupied(pawn.x, pawn.y + 2 * dirY, pieceState)
  )
    possibleMoves.push({ x: pawn.x, y: pawn.y + 2 * dirY });

  if (!isSquareOccupied(pawn.x, pawn.y + dirY, pieceState))
    possibleMoves.push({ x: pawn.x, y: pawn.y + dirY });

  if (
    isSquareOccupiedByOpponent(pawn.x - 1, pawn.y + dirY, pieceState, pawn.team)
  ) {
    possibleMoves.push({ x: pawn.x - 1, y: pawn.y + dirY });
  } else if (!isSquareOccupied(pawn.x - 1, pawn.y + dirY, pieceState)) {
    const piece = getPieceAtSquare(pawn.x - 1, pawn.y, pieceState);
    if (piece && piece.pieceType === PieceType.PAWN && piece.enPassant) {
      possibleMoves.push({ x: pawn.x - 1, y: pawn.y + dirY });
    }
  }

  if (
    isSquareOccupiedByOpponent(pawn.x + 1, pawn.y + dirY, pieceState, pawn.team)
  ) {
    possibleMoves.push({ x: pawn.x + 1, y: pawn.y + dirY });
  } else if (!isSquareOccupied(pawn.x + 1, pawn.y + dirY, pieceState)) {
    const piece = getPieceAtSquare(pawn.x + 1, pawn.y, pieceState);
    if (piece && piece.pieceType === PieceType.PAWN && piece.enPassant) {
      possibleMoves.push({ x: pawn.x + 1, y: pawn.y + dirY });
    }
  }

  return possibleMoves;
};
