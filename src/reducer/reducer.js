import { GameStatus } from "../constants";
import { ACTION_TYPE } from "./actionType";

export function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.NEW_MOVE: {
      const { turn, positions, movesNotationList } = state;
      const newTurn = turn === "w" ? "b" : "w";
      const newPositions = [...positions, action.payload.newPosition];
      const newMovesNotationList = [
        ...movesNotationList,
        action.payload.moveNotation,
      ];
      return {
        ...state,
        turn: newTurn,
        positions: newPositions,
        movesNotationList: newMovesNotationList,
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

    case ACTION_TYPE.UPDATE_CASTLE_STATE: {
      const { turn, castleDirection } = state;
      castleDirection[turn] = action.payload;
      return {
        ...state,
        castleDirection,
      };
    }

    case ACTION_TYPE.STALEMATE: {
      return {
        ...state,
        gameStatus: GameStatus.STALEMATE,
      };
    }

    case ACTION_TYPE.INSUFFICIENT_MATERIAL: {
      return {
        ...state,
        gameStatus: GameStatus.INSUFFICIENT_MATERIAL,
      };
    }

    case ACTION_TYPE.NEW_GAME: {
      return {
        ...action.payload,
      };
    }

    case ACTION_TYPE.WIN: {
      return {
        ...state,
        gameStatus:
          action.payload === "w" ? GameStatus.WHITE_WIN : GameStatus.BLACK_WIN,
      };
    }

    case ACTION_TYPE.TAKEBACK: {
      let { turn, positions, movesNotationList } = state;

      if (positions.length > 1) {
        positions = positions.slice(0, positions.length - 1);
        movesNotationList = movesNotationList.slice(
          0,
          movesNotationList.length - 1
        );
        turn = turn === "w" ? "b" : "w";
      }

      return {
        ...state,
        positions,
        movesNotationList,
        turn,
      };
    }

    default: {
      return state;
    }
  }
}
