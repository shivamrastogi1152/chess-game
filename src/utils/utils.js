import Piece from "./Piece";
import PieceType from "./PieceType";
import TeamType from "./TeamType";

export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const VERTICAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8];
export const BOARD_LENGTH = 640;
export const SQUARE_LENGTH = 80;
export const OFFSET = 0;
export const IMG_URL = "/assets/images";

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
      const team = c === 0 ? TeamType.WHITE : TeamType.BLACK;
      const color = team === TeamType.BLACK ? "b" : "w";
      const y = team === TeamType.WHITE ? 1 : 6;
      pieces.push(
        new Piece(
          x,
          y,
          `${IMG_URL}/${PieceType.PAWN.toLowerCase()}_${color}.png`,
          PieceType.PAWN,
          team
        )
      );
    }
  }
};

const fillRooks = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.WHITE : TeamType.BLACK;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.WHITE ? 0 : 7;
    pieces.push(
      new Piece(
        0,
        y,
        `${IMG_URL}/${PieceType.ROOK.toLowerCase()}_${color}.png`,
        PieceType.ROOK,
        team
      )
    );
    pieces.push(
      new Piece(
        7,
        y,
        `${IMG_URL}/${PieceType.ROOK.toLowerCase()}_${color}.png`,
        PieceType.ROOK,
        team
      )
    );
  }
};

const fillKnights = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.WHITE : TeamType.BLACK;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.WHITE ? 0 : 7;
    pieces.push(
      new Piece(
        1,
        y,
        `${IMG_URL}/${PieceType.KNIGHT.toLowerCase()}_${color}.png`,
        PieceType.KNIGHT,
        team
      )
    );
    pieces.push(
      new Piece(
        6,
        y,
        `${IMG_URL}/${PieceType.KNIGHT.toLowerCase()}_${color}.png`,
        PieceType.KNIGHT,
        team
      )
    );
  }
};

const fillBishops = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.WHITE : TeamType.BLACK;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.WHITE ? 0 : 7;
    pieces.push(
      new Piece(
        2,
        y,
        `${IMG_URL}/${PieceType.BISHOP.toLowerCase()}_${color}.png`,
        PieceType.BISHOP,
        team
      )
    );
    pieces.push(
      new Piece(
        5,
        y,
        `${IMG_URL}/${PieceType.BISHOP.toLowerCase()}_${color}.png`,
        PieceType.BISHOP,
        team
      )
    );
  }
};

const fillQueens = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.WHITE : TeamType.BLACK;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.WHITE ? 0 : 7;
    pieces.push(
      new Piece(
        3,
        y,
        `${IMG_URL}/${PieceType.QUEEN.toLowerCase()}_${color}.png`,
        PieceType.QUEEN,
        team
      )
    );
  }
};

const fillKings = (pieces) => {
  for (let c = 0; c < 2; c++) {
    const team = c === 0 ? TeamType.WHITE : TeamType.BLACK;
    const color = team === TeamType.BLACK ? "b" : "w";
    const y = team === TeamType.WHITE ? 0 : 7;
    pieces.push(
      new Piece(
        4,
        y,
        `${IMG_URL}/${PieceType.KING.toLowerCase()}_${color}.png`,
        PieceType.KING,
        team
      )
    );
  }
};
