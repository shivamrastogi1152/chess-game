import Piece from "../utils/Piece";
import PieceType from "../utils/PieceType";
import TeamType from "../utils/TeamType";

class Referee {
  isSquareOccupied(toX, toY, pieceState) {
    const piece = pieceState.find((p) => {
      if (p.x === toX && p.y === toY) return true;
    });
    return piece != null;
  }

  isSquareOccupiedByOpponent(toX, toY, pieceState, team) {
    const piece = pieceState.find((p) => {
      if (p.x === toX && p.y === toY && p.team != team) return true;
    });
    // console.log(piece);
    return piece != null;
  }

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

  isValidPawnMove(fromX, fromY, toX, toY, team, pieceState) {
    const firstRank = team === TeamType.WHITE ? 1 : 6;
    const dirY = team === TeamType.WHITE ? 1 : -1;

    //Pawn Movement Logic
    if (
      fromX === toX &&
      toY - fromY === dirY &&
      !this.isSquareOccupied(toX, toY, pieceState)
    ) {
      return true;
    } else if (
      fromY === firstRank &&
      fromX === toX &&
      toY - fromY === 2 * dirY &&
      !this.isSquareOccupied(toX, toY - dirY, pieceState) &&
      !this.isSquareOccupied(toX, toY, pieceState)
    ) {
      return true;
    }

    //Pawn Attack
    //Basic Attack Logic
    if (
      Math.abs(fromX - toX) === 1 &&
      toY - fromY === dirY &&
      this.isSquareOccupiedByOpponent(toX, toY, pieceState, team)
    ) {
      return true;
    }

    return false;
  }

  isValidMove(fromX, fromY, toX, toY, pieceType, team, pieceState) {
    // console.log(
    //   `Moving ${team} ${pieceType} from (${fromX}, ${fromY}) to (${toX}, ${toY})`
    // );

    if (pieceType === PieceType.PAWN) {
      if (this.isValidPawnMove(fromX, fromY, toX, toY, team, pieceState))
        return true;
    }

    // console.log(
    //   `${team} ${pieceType} can't be moved from (${fromX},${fromY}) to (${toX},${toY})`
    // );
    return false;
  }
}

export default Referee;
