import { PieceType } from "../constants";
import referee from "./referee";

function getPieceColor(piece) {
  return piece[piece.length - 1];
}

function getPieceType(piece) {
  return piece.split("_")[0];
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

export function getCastlingMoves({
  currentPosition,
  castleDirection,
  rank,
  file,
  piece,
}) {
  const moves = [];
  const us = getPieceColor(piece);
  const opponent = us === "w" ? "b" : "w";
  const kingOriginalRank = us === "w" ? 0 : 7;

  const longCastlingSquares = [
    [kingOriginalRank, 3],
    [kingOriginalRank, 2],
    [kingOriginalRank, 1],
  ];

  const shortCastlingSquares = [
    [kingOriginalRank, 5],
    [kingOriginalRank, 6],
  ];

  if (file !== 4 || rank !== kingOriginalRank || castleDirection === "none")
    return moves;

  //Cannot castle if we're currently under check!
  if (referee.playerInCheck({ positionAfterMove: currentPosition, player: us }))
    return moves;

  //Check for long castle
  //1. Check if castling is allowed
  //2. Check that there should be NO pieces between left rook and king
  //3. Check that left rook is still in original place
  // (If it's moved earlier and now back to original place, castle direction would be changed to 'Right')
  // Above case is handled in getCastleDirections() func
  //4. All squares between rook and king should not be under attack!!!

  if (
    ["Left", "Both"].includes(castleDirection) &&
    !currentPosition[kingOriginalRank][3] &&
    !currentPosition[kingOriginalRank][2] &&
    !currentPosition[kingOriginalRank][1] &&
    currentPosition[kingOriginalRank][0] === `${PieceType.ROOK}_${us}` &&
    !referee.playerInCheck({
      positionAfterMove: referee.performMove({
        position: currentPosition,
        piece,
        fromRow: rank,
        fromCol: file,
        toRow: kingOriginalRank,
        toCol: 3,
      }),
      player: us,
    }) &&
    !referee.playerInCheck({
      positionAfterMove: referee.performMove({
        position: currentPosition,
        piece,
        fromRow: rank,
        fromCol: file,
        toRow: kingOriginalRank,
        toCol: 2,
      }),
      player: us,
    }) &&
    !referee.playerInCheck({
      positionAfterMove: referee.performMove({
        position: currentPosition,
        piece,
        fromRow: rank,
        fromCol: file,
        toRow: kingOriginalRank,
        toCol: 1,
      }),
      player: us,
    })
  ) {
    moves.push([kingOriginalRank, 2]);
  }

  //Check for short castle
  //1. Check if castling is allowed
  //2. Check that there should be NO pieces between right rook and king
  //3. Check that right rook is still in original place
  // (If it's moved earlier and now back to original place, castle direction would be changed to 'Left')
  // Above case is handled in getCastleDirections() func
  //4. All squares between rook and king should not be under attack!!!

  if (
    ["Right", "Both"].includes(castleDirection) &&
    !currentPosition[kingOriginalRank][5] &&
    !currentPosition[kingOriginalRank][6] &&
    currentPosition[kingOriginalRank][7] === `${PieceType.ROOK}_${us}` &&
    !referee.playerInCheck({
      positionAfterMove: referee.performMove({
        position: currentPosition,
        piece,
        fromRow: rank,
        fromCol: file,
        toRow: kingOriginalRank,
        toCol: 5,
      }),
      player: us,
    }) &&
    !referee.playerInCheck({
      positionAfterMove: referee.performMove({
        position: currentPosition,
        piece,
        fromRow: rank,
        fromCol: file,
        toRow: kingOriginalRank,
        toCol: 5,
      }),
      player: us,
    })
  ) {
    moves.push([kingOriginalRank, 6]);
  }

  return moves;
}

export function getCastleDirections({ castleDirection, piece, rank, file }) {
  const color = getPieceColor(piece);
  const pieceType = getPieceType(piece);
  const initialRank = color === "w" ? 0 : 7;
  const direction = castleDirection[color];

  //If the king has been moved even once then castling is not allowed anymore!
  if (pieceType === PieceType.KING) {
    return "None";
  }

  //If any rook present at it's original posn has been moved
  //then that rook can't be used for castling -> We can't castle to that side of the board!
  if (pieceType === PieceType.ROOK) {
    if (file === 0 && rank === initialRank) {
      if (direction === "Both") return "Right";
      if (direction === "Left") return "None";
    }

    if (file === 7 && rank === initialRank) {
      if (direction === "Both") return "Left";
      if (direction === "Right") return "None";
    }
  }
}

export function getKingPosition(position, player) {
  let kingPos = null;
  position.forEach((row, r) => {
    row.forEach((col, c) => {
      const piece = position[r][c];
      const pieceType = getPieceType(piece);
      const color = getPieceColor(piece);

      if (pieceType === PieceType.KING && color === player) {
        kingPos = [r, c];
        return kingPos;
      }
    });
  });

  return kingPos;
}
export function getPiecesOfPlayer(position, player) {
  const pieces = [];
  position.forEach((row, r) => {
    row.forEach((col, c) => {
      const piece = position[r][c];
      const color = getPieceColor(piece);

      if (color === player) {
        pieces.push({
          piece: position[r][c],
          rank: r,
          file: c,
        });
      }
    });
  });

  return pieces;
}

export function getAllPieces(position) {
  const pieces = [];
  position.forEach((row, r) => {
    row.forEach((col, c) => {
      if (position[r][c] !== "") pieces.push(position[r][c]);
    });
  });
  return pieces;
}
