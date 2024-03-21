import Piece from "./Piece";

export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const verticalAxis = [8, 7, 6, 5, 4, 3, 2, 1];

export const getPieces = () => {
  const pieces = [];
  fillPawns(pieces);
  fillRooks(pieces);
  fillKnights(pieces);
  fillBishops(pieces);
  fillQueens(pieces);
  fillKings(pieces);

  return pieces;
};

const fillPawns = (pieces) => {
  for (let x = 0; x < 8; x++) {
    for (let c = 0; c < 2; c++) {
      const color = c === 0 ? "b" : "w";
      const y = c === 0 ? 1 : 6;
      pieces.push(new Piece(x, y, `assets/images/pawn_${color}.png`, "P"));
    }
  }
};

const fillRooks = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const color = c === 0 ? "b" : "w";
    const y = c === 0 ? 0 : 7;
    pieces.push(new Piece(0, y, `assets/images/rook_${color}.png`, "R"));
    pieces.push(new Piece(7, y, `assets/images/rook_${color}.png`, "R"));
  }
};

const fillKnights = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const color = c === 0 ? "b" : "w";
    const y = c === 0 ? 0 : 7;
    pieces.push(new Piece(1, y, `assets/images/knight_${color}.png`, "R"));
    pieces.push(new Piece(6, y, `assets/images/knight_${color}.png`, "R"));
  }
};

const fillBishops = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const color = c === 0 ? "b" : "w";
    const y = c === 0 ? 0 : 7;
    pieces.push(new Piece(2, y, `assets/images/bishop_${color}.png`, "B"));
    pieces.push(new Piece(5, y, `assets/images/bishop_${color}.png`, "B"));
  }
};

const fillQueens = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const color = c === 0 ? "b" : "w";
    const y = c === 0 ? 0 : 7;
    pieces.push(new Piece(3, y, `assets/images/queen_${color}.png`, "Q"));
  }
};

const fillKings = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const color = c === 0 ? "b" : "w";
    const y = c === 0 ? 0 : 7;
    pieces.push(new Piece(4, y, `assets/images/king_${color}.png`, "Q"));
  }
};
