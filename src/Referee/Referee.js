import PieceType from "../utils/PieceType";
import TeamType from "../utils/TeamType";
import {
  isValidBishopMove,
  isValidKingMove,
  isValidKnightMove,
  isValidPawnMove,
  addPossibleMovesForPawn,
  isValidQueenMove,
  isValidRookMove,
} from "./rules";

class Referee {
  isEnPassantMove(fromX, fromY, toX, toY, pieceType, team, pieceState) {
    const dirY = team === TeamType.WHITE ? 1 : -1;

    if (
      pieceType === PieceType.PAWN &&
      Math.abs(fromX - toX) === 1 &&
      toY - fromY === dirY
    ) {
      const piece = pieceState.find(
        (p) =>
          p.x === toX &&
          p.y === toY - dirY &&
          p.pieceType === PieceType.PAWN &&
          p.enPassant
      );
      if (piece) return true;
    }

    return false;
  }

  isValidMove(fromX, fromY, toX, toY, pieceType, team, pieceState) {
    // console.log(
    //   `Moving ${team} ${pieceType} from (${fromX}, ${fromY}) to (${toX}, ${toY})`
    // );
    if (pieceType === PieceType.PAWN)
      return isValidPawnMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.KNIGHT)
      return isValidKnightMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.BISHOP)
      return isValidBishopMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.ROOK)
      return isValidRookMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.QUEEN)
      return isValidQueenMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.KING)
      return isValidKingMove(fromX, fromY, toX, toY, team, pieceState);
    // console.log(
    //   `${team} ${pieceType} can't be moved from (${fromX},${fromY}) to (${toX},${toY})`
    // );
    return false;
  }

  addPossibleMoves(currentPiece, pieceState) {
    if (currentPiece.pieceType === PieceType.PAWN)
      return addPossibleMovesForPawn(currentPiece, pieceState);
  }
}

export default Referee;
