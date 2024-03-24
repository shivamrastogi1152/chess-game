import Piece from "../utils/Piece";
import PieceType from "../utils/PieceType";
import TeamType from "../utils/TeamType";

class Referee {
  getPieceAtSquare(x, y, pieceState) {
    const piece = pieceState.find((p) => p.x === x && p.y === y);
    return piece;
  }

  isSquareOccupied(toX, toY, pieceState) {
    const piece = this.getPieceAtSquare(toX, toY, pieceState);
    return piece != null;
  }

  isSquareOccupiedByOpponent(toX, toY, pieceState, team) {
    const piece = this.getPieceAtSquare(toX, toY, pieceState);
    return piece != null && piece.team != team;
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

    //Pawn Attack (En passant is handled separately)
    if (
      Math.abs(fromX - toX) === 1 &&
      toY - fromY === dirY &&
      this.isSquareOccupiedByOpponent(toX, toY, pieceState, team)
    ) {
      return true;
    }

    return false;
  }

  isValidKnightMove(fromX, fromY, toX, toY, team, pieceState) {
    if (
      (Math.abs(toX - fromX) === 2 && Math.abs(toY - fromY) === 1) ||
      (Math.abs(toX - fromX) === 1 && Math.abs(toY - fromY) === 2)
    ) {
      return (
        !this.isSquareOccupied(toX, toY, pieceState) ||
        this.isSquareOccupiedByOpponent(toX, toY, pieceState, team)
      );
    }
    return false;
  }

  isValidBishopMove(fromX, fromY, toX, toY, team, pieceState) {
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
        if (this.isSquareOccupied(nextX, nextY, pieceState)) {
          // Obstruction found -> invalid move
          return false;
        }
      }

      // Check if the destination square is unoccupied or occupied by an opponent's piece
      return (
        !this.isSquareOccupied(toX, toY, pieceState) ||
        this.isSquareOccupiedByOpponent(toX, toY, pieceState, team)
      );
    }

    return false;
  }

  isValidRookMove(fromX, fromY, toX, toY, team, pieceState) {
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
        if (this.isSquareOccupied(nextX, nextY, pieceState)) {
          // Obstruction found -> invalid move
          return false;
        }
      }

      // Check if the destination square is unoccupied or occupied by an opponent's piece
      return (
        !this.isSquareOccupied(toX, toY, pieceState) ||
        this.isSquareOccupiedByOpponent(toX, toY, pieceState, team)
      );
    }

    return false;
  }

  isValidQueenMove(fromX, fromY, toX, toY, team, pieceState) {
    const deltaX = Math.abs(toX - fromX);
    const deltaY = Math.abs(toY - fromY);
    const dirX = Math.sign(toX - fromX);
    const dirY = Math.sign(toY - fromY);
    const maxSteps = Math.max(deltaX, deltaY);

    // Diagonal Movement Check
    if (deltaX === deltaY) {
      for (let step = 1; step < maxSteps; step++) {
        const nextX = fromX + dirX * step;
        const nextY = fromY + dirY * step;

        // Check if any square between from and to is occupied
        if (this.isSquareOccupied(nextX, nextY, pieceState)) {
          // Obstruction found -> invalid move
          return false;
        }
      }

      // Check if the destination square is unoccupied or occupied by an opponent's piece
      return (
        !this.isSquareOccupied(toX, toY, pieceState) ||
        this.isSquareOccupiedByOpponent(toX, toY, pieceState, team)
      );
    }
    // Check if the move is either purely horizontal or purely vertical
    else if ((deltaX === 0 && deltaY !== 0) || (deltaX !== 0 && deltaY === 0)) {
      for (let step = 1; step < maxSteps; step++) {
        const nextX = fromX + dirX * step;
        const nextY = fromY + dirY * step;

        // Check if any square between from and to is occupied
        if (this.isSquareOccupied(nextX, nextY, pieceState)) {
          // Obstruction found -> invalid move
          return false;
        }
      }
      // Check if the destination square is unoccupied or occupied by an opponent's piece
      return (
        !this.isSquareOccupied(toX, toY, pieceState) ||
        this.isSquareOccupiedByOpponent(toX, toY, pieceState, team)
      );
    }
    //Neither Diagonal nor Horizontal/Vertical movement -> invalid move
    return false;
  }

  isValidKingMove(fromX, fromY, toX, toY, team, pieceState) {
    const deltaX = Math.abs(toX - fromX);
    const deltaY = Math.abs(toY - fromY);

    // TO DO: Check if king is moving into danger
    return (
      deltaX <= 1 &&
      deltaY <= 1 &&
      (!this.isSquareOccupied(toX, toY, pieceState) ||
        this.isSquareOccupiedByOpponent(toX, toY, pieceState, team))
    );
  }

  isValidMove(fromX, fromY, toX, toY, pieceType, team, pieceState) {
    // console.log(
    //   `Moving ${team} ${pieceType} from (${fromX}, ${fromY}) to (${toX}, ${toY})`
    // );
    if (pieceType === PieceType.PAWN)
      return this.isValidPawnMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.KNIGHT)
      return this.isValidKnightMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.BISHOP)
      return this.isValidBishopMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.ROOK)
      return this.isValidRookMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.QUEEN)
      return this.isValidQueenMove(fromX, fromY, toX, toY, team, pieceState);
    else if (pieceType === PieceType.KING)
      return this.isValidKingMove(fromX, fromY, toX, toY, team, pieceState);
    // console.log(
    //   `${team} ${pieceType} can't be moved from (${fromX},${fromY}) to (${toX},${toY})`
    // );
    return false;
  }
}

export default Referee;
