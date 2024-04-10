import { PieceType } from "../constants";
import { copyPosition } from "../helper";

function getPieceType(piece) {
  return piece.split("_")[0];
}

function getPieceColor(piece) {
  return piece[piece.length - 1];
}

export function movePawn({ position, piece, fromRow, fromCol, toRow, toCol }) {
  const newPosition = copyPosition(position);
  //En-passant is like capturing empty square
  //But the pawn at front needs to eliminated
  if (
    newPosition[toRow][toCol] === "" &&
    toRow !== fromRow &&
    toCol !== fromCol
  ) {
    newPosition[fromRow][toCol] = "";
  }

  newPosition[fromRow][fromCol] = "";
  newPosition[toRow][toCol] = piece;
  return newPosition;
}

export function movePiece({ position, piece, fromRow, fromCol, toRow, toCol }) {
  const newPosition = copyPosition(position);
  const color = getPieceColor(piece);

  //Move the rooks to appropriate square if it's a castling move!
  if (
    getPieceType(piece) === PieceType.KING &&
    Math.abs(fromCol - toCol) === 2
  ) {
    if (toCol === 2) {
      newPosition[toRow][toCol + 1] = `${PieceType.ROOK}_${color}`;
      newPosition[toRow][0] = "";
    } else if (toCol === 6) {
      newPosition[toRow][toCol - 1] = `${PieceType.ROOK}_${color}`;
      newPosition[toRow][7] = "";
    }
  }

  newPosition[fromRow][fromCol] = "";
  newPosition[toRow][toCol] = piece;
  return newPosition;
}
