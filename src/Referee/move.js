import { copyPosition } from "../helper";

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
  newPosition[fromRow][fromCol] = "";
  newPosition[toRow][toCol] = piece;
  return newPosition;
}
