import { PieceType } from "../constants";

function getPieceColor(piece) {
  return piece[piece.length - 1];
}

function isValidSquare(rank, file) {
  return rank >= 0 && rank < 8 && file >= 0 && file < 8;
}

export function getRookMoves({ currentPosition, rank, file, piece }) {
  const moves = [];
  const us = getPieceColor(piece);
  const opponent = us === "w" ? "b" : "w";

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  directions.forEach((dir) => {
    for (let step = 1; step < 8; step++) {
      const newRank = rank + step * dir[0];
      const newFile = file + step * dir[1];

      if (isValidSquare(newRank, newFile)) {
        const pieceAtNewSquare = currentPosition[newRank][newFile];
        if (
          pieceAtNewSquare.length > 0 &&
          getPieceColor(pieceAtNewSquare) === opponent
        ) {
          moves.push([newRank, newFile]);
          break;
        } else if (
          pieceAtNewSquare.length > 0 &&
          getPieceColor(pieceAtNewSquare) === us
        ) {
          break;
        } else moves.push([newRank, newFile]);
      } else break;
    }
  });

  return moves;
}

export function getKnightMoves({ currentPosition, rank, file, piece }) {
  const moves = [];
  const us = getPieceColor(piece);
  const opponent = us === "w" ? "b" : "w";

  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  directions.forEach((dir) => {
    const newRank = rank + dir[0];
    const newFile = file + dir[1];

    if (newRank >= 0 && newRank < 8 && newFile >= 0 && newFile < 8) {
      const pieceAtNewSquare = currentPosition[newRank][newFile];
      if (pieceAtNewSquare.length === 0) {
        moves.push([newRank, newFile]);
      } else if (getPieceColor(pieceAtNewSquare) === opponent) {
        moves.push([newRank, newFile]);
      }
    }
  });

  return moves;
}

export function getBishopMoves({ currentPosition, rank, file, piece }) {
  const moves = [];
  const us = getPieceColor(piece);
  const opponent = us === "w" ? "b" : "w";

  const directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  directions.forEach((dir) => {
    for (let step = 1; step < 8; step++) {
      const newRank = rank + step * dir[0];
      const newFile = file + step * dir[1];

      if (!isValidSquare(newRank, newFile)) break;

      const pieceAtNewSquare = currentPosition[newRank][newFile];
      if (
        pieceAtNewSquare.length > 0 &&
        getPieceColor(pieceAtNewSquare) === opponent
      ) {
        moves.push([newRank, newFile]);
        break;
      } else if (
        pieceAtNewSquare.length > 0 &&
        getPieceColor(pieceAtNewSquare) === us
      ) {
        break;
      } else moves.push([newRank, newFile]);
    }
  });

  return moves;
}

export function getQueenMoves({ currentPosition, rank, file, piece }) {
  return [
    ...getBishopMoves({ currentPosition, rank, file, piece }),
    ...getRookMoves({ currentPosition, rank, file, piece }),
  ];
}

export function getKingMoves({ currentPosition, rank, file, piece }) {
  const moves = [];
  const us = getPieceColor(piece);
  const opponent = us === "w" ? "b" : "w";

  const directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  directions.forEach((dir) => {
    const newRank = rank + dir[0];
    const newFile = file + dir[1];

    if (isValidSquare(newRank, newFile)) {
      const pieceAtNewSquare = currentPosition[newRank][newFile];
      if (getPieceColor(pieceAtNewSquare) !== us) {
        moves.push([newRank, newFile]);
      }
    }
  });

  return moves;
}

export function getPawnMoves({ currentPosition, rank, file, piece }) {
  const moves = [];
  const us = getPieceColor(piece);
  const opponent = us === "w" ? "b" : "w";
  const dir = us === "w" ? 1 : -1;
  const specialRank = us === "w" ? 1 : 6;

  if (
    rank === specialRank &&
    isValidSquare(rank + 2 * dir, file) &&
    currentPosition[rank + 2 * dir][file].length === 0
  ) {
    moves.push([rank + 2 * dir, file]);
  }
  if (
    isValidSquare(rank + dir, file) &&
    currentPosition[rank + dir][file].length === 0
  ) {
    moves.push([rank + dir, file]);
  }

  return moves;
}

export function getPawnAttackMoves({
  currentPosition,
  prevPosition,
  rank,
  file,
  piece,
}) {
  const moves = [];
  const us = getPieceColor(piece);
  const opponent = us === "w" ? "b" : "w";
  const dir = us === "w" ? 1 : -1;

  if (isValidSquare(rank + dir, file - 1)) {
    const newRank = rank + dir;
    const newFile = file - 1;
    const pieceAtNewSquare = currentPosition[newRank][newFile];
    if (getPieceColor(pieceAtNewSquare) === opponent) {
      moves.push([newRank, newFile]);
    }
  }

  if (isValidSquare(rank + dir, file + 1)) {
    const newRank = rank + dir;
    const newFile = file + 1;
    const pieceAtNewSquare = currentPosition[newRank][newFile];
    if (getPieceColor(pieceAtNewSquare) === opponent) {
      moves.push([newRank, newFile]);
    }
  }

  //En-Passant
  const enemyPawn = PieceType.PAWN + "_" + opponent;
  const adjacentFiles = [file - 1, file + 1];

  if (prevPosition) {
    if ((us === "w" && rank === 4) || (us === "b" && rank === 3)) {
      adjacentFiles.forEach((f) => {
        if (
          currentPosition?.[rank]?.[f] === enemyPawn &&
          currentPosition?.[rank + 2 * dir]?.[f] === "" &&
          prevPosition?.[rank]?.[f] === "" &&
          prevPosition?.[rank + 2 * dir][f] === enemyPawn
        ) {
          moves.push([rank + dir, f]);
        }
      });
    }
  }

  return moves;
}
