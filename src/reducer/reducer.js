import { GameStatus } from "../constants";
import { ACTION_TYPE } from "./actionType";

export function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.NEW_MOVE: {
      const { turn } = state;
      const { positions } = state;
      const newTurn = turn === "w" ? "b" : "w";
      const newPositions = [...positions, action.payload.newPosition];
      return {
        ...state,
        turn: newTurn,
        positions: newPositions,
      };
    }

    case ACTION_TYPE.UPDATE_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: action.payload.candidateMoves,
      };
    }

    case ACTION_TYPE.CLEAR_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: [],
      };
    }

    case ACTION_TYPE.OPEN_PROMOTION_BOX: {
      return {
        ...state,
        gameStatus: GameStatus.PAWN_PROMOTION,
        promotionSquare: { ...action.payload },
      };
    }

    case ACTION_TYPE.CLOSE_PROMOTION_BOX: {
      return {
        ...state,
        gameStatus: GameStatus.IN_PROGRESS,
      };
    }

    default: {
      return state;
    }
  }
}
