import Piece from "./Piece";
import PieceType from "./PieceType";
import TeamType from "./TeamType";

export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];

export const getInitialPieceState = () => {
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
      const team = c === 0 ? TeamType.BLACK : TeamType.WHITE;
      const color = team === TeamType.BLACK ? "b" : "w";
      const y = team === TeamType.BLACK ? 1 : 6;
      pieces.push(
        new Piece(x, y, `assets/images/pawn_${color}.png`, PieceType.PAWN, team)
      );
    }
  }
};

const fillRooks = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.BLACK : TeamType.WHITE;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.BLACK ? 0 : 7;
    pieces.push(
      new Piece(0, y, `assets/images/rook_${color}.png`, PieceType.ROOK, team)
    );
    pieces.push(
      new Piece(7, y, `assets/images/rook_${color}.png`, PieceType.ROOK, team)
    );
  }
};

const fillKnights = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.BLACK : TeamType.WHITE;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.BLACK ? 0 : 7;
    pieces.push(
      new Piece(
        1,
        y,
        `assets/images/knight_${color}.png`,
        PieceType.KNIGHT,
        team
      )
    );
    pieces.push(
      new Piece(
        6,
        y,
        `assets/images/knight_${color}.png`,
        PieceType.KNIGHT,
        team
      )
    );
  }
};

const fillBishops = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.BLACK : TeamType.WHITE;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.BLACK ? 0 : 7;
    pieces.push(
      new Piece(
        2,
        y,
        `assets/images/bishop_${color}.png`,
        PieceType.BISHOP,
        team
      )
    );
    pieces.push(
      new Piece(
        5,
        y,
        `assets/images/bishop_${color}.png`,
        PieceType.BISHOP,
        team
      )
    );
  }
};

const fillQueens = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.BLACK : TeamType.WHITE;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.BLACK ? 0 : 7;
    pieces.push(
      new Piece(3, y, `assets/images/queen_${color}.png`, PieceType.QUEEN, team)
    );
  }
};

const fillKings = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.BLACK : TeamType.WHITE;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.BLACK ? 0 : 7;
    pieces.push(
      new Piece(4, y, `assets/images/king_${color}.png`, PieceType.KING, team)
    );
  }
};
