import { getInitPosition } from "./helper";

export const PieceType = {
  PAWN: "pawn",
  QUEEN: "queen",
  ROOK: "rook",
  BISHOP: "bishop",
  KNIGHT: "knight",
  KING: "king",
};

export const GameStatus = {
  IN_PROGRESS: "inProgress",
  PAWN_PROMOTION: "pawnPromotion",
  WHITE_WIN: "White wins!",
  BLACK_WIN: "Black wins!",
  STALEMATE: "Draw by Stalemate",
  INSUFFICIENT_MATERIAL: "Draw by Insufficient material",
};

export const initGameState = {
  positions: [getInitPosition()],
  turn: "w",
  candidateMoves: [],
  gameStatus: GameStatus.IN_PROGRESS,
  promotionSquare: null,
  castleDirection: {
    w: "Both",
    b: "Both",
  },
};
