import { PieceType } from "../constants";
import {
  getRookMoves,
  getKnightMoves,
  getBishopMoves,
  getQueenMoves,
  getKingMoves,
  getPawnMoves,
  getPawnAttackMoves,
} from "./getMoves";
import { movePawn, movePiece } from "./move";

function getPieceType(piece) {
  return piece.split("_")[0];
}

const referee = {
  getRegularMoves: function ({ currentPosition, rank, file, piece }) {
    const pieceType = getPieceType(piece);

    if (pieceType === PieceType.ROOK)
      return getRookMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.KNIGHT)
      return getKnightMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.BISHOP)
      return getBishopMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.QUEEN)
      return getQueenMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.KING)
      return getKingMoves({ currentPosition, rank, file, piece });
    if (pieceType === PieceType.PAWN) {
      return getPawnMoves({ currentPosition, rank, file, piece });
    }

    return [];
  },

  getValidMoves: function ({
    currentPosition,
    prevPosition,
    rank,
    file,
    piece,
  }) {
    let moves = this.getRegularMoves({ currentPosition, rank, file, piece });
    if (getPieceType(piece) === PieceType.PAWN) {
      moves = [
        ...moves,
        ...getPawnAttackMoves({
          currentPosition,
          prevPosition,
          rank,
          file,
          piece,
        }),
      ];
    }
    return moves;
  },

  performMove: function ({ position, piece, fromRow, fromCol, toRow, toCol }) {
    if (getPieceType(piece) === PieceType.PAWN) {
      return movePawn({ position, piece, fromRow, fromCol, toRow, toCol });
    } else {
      return movePiece({ position, piece, fromRow, fromCol, toRow, toCol });
    }
  },
};

export default referee;
