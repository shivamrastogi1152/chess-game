import { PieceNotation, PieceType } from "./constants";
import referee from "./referee/referee";

export const getCharacter = (character) => String.fromCharCode(character + 96);

export const getInitPosition = () => {
  const position = new Array(8).fill("").map((x) => new Array(8).fill(""));
  for (let file = 0; file < 8; file++) {
    position[1][file] = "pawn_w";
    position[6][file] = "pawn_b";
  }
  for (let c = 0; c < 2; c++) {
    const color = c === 0 ? "w" : "b";
    const rank = color === "w" ? 0 : 7;
    position[rank][0] = `rook_${color}`;
    position[rank][7] = `rook_${color}`;
    position[rank][1] = `knight_${color}`;
    position[rank][6] = `knight_${color}`;
    position[rank][2] = `bishop_${color}`;
    position[rank][5] = `bishop_${color}`;
    position[rank][3] = `queen_${color}`;
    position[rank][4] = `king_${color}`;
  }

  return position;
};

export const copyPosition = (position) => {
  const newPosition = new Array(8).fill("").map((x) => new Array(8).fill(""));
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      newPosition[row][col] = position[row][col];
    }
  }

  return newPosition;
};

export const areSameColorSquares = (coords1, coords2) => {
  return (
    (coords1.rank + coords1.file) % 2 === (coords2.rank + coords2.file) % 2
  );
};

export const findPieceCoords = (position, piece) => {
  const result = [];
  position.forEach((row, r) => {
    row.forEach((col, c) => {
      if (position[r][c] === piece) {
        result.push({ rank: r, file: c });
      }
    });
  });
  return result;
};

export const getMoveNotation = ({
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  currentPosition,
  promotesTo,
  positionAfterMove,
}) => {
  let notation = "";
  const pieceType = getPieceType(piece);
  const pieceColor = getPieceColor(piece);

  //Castling
  if (pieceType === PieceType.KING && Math.abs(fromCol - toCol) === 2) {
    if (toCol > fromCol) return "O-O";
    else return "O-O-O";
  }

  if (pieceType !== PieceType.PAWN) {
    notation += getPieceNotation(pieceType);

    if (currentPosition[toRow][toCol] !== "") {
      notation += PieceNotation.CAPTURE;
    }
  } else {
    if (currentPosition[toRow][toCol] !== "") {
      notation += getCharacter(fromCol + 1) + PieceNotation.CAPTURE;
    }
  }

  notation += getCharacter(toCol + 1) + (toRow + 1);

  if (pieceType === PieceType.PAWN) {
    const promotionRow = pieceColor === "w" ? 7 : 0;
    if (toRow === promotionRow) {
      notation +=
        PieceNotation.EQUAL + getPieceNotation(getPieceType(promotesTo));
    }
  }
  
  return notation;
};

function getPieceColor(piece) {
  return piece[piece.length - 1];
}

function getPieceType(piece) {
  return piece.split("_")[0];
}

function getPieceNotation(pieceType) {
  if (pieceType === PieceType.KING) return PieceNotation.KING;
  if (pieceType === PieceType.BISHOP) return PieceNotation.BISHOP;
  if (pieceType === PieceType.QUEEN) return PieceNotation.QUEEN;
  if (pieceType === PieceType.PAWN) return PieceNotation.PAWN;
  if (pieceType === PieceType.ROOK) return PieceNotation.ROOK;
  if (pieceType === PieceType.KNIGHT) return PieceNotation.KNIGHT;
}
