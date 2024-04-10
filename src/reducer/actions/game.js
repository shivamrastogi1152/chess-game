import { initGameState } from "../../constants";
import { ACTION_TYPE } from "../actionType";

export function updateCastling(direction) {
  return {
    type: ACTION_TYPE.UPDATE_CASTLE_STATE,
    payload: direction,
  };
}

export function triggerStalemate() {
  return {
    type: ACTION_TYPE.STALEMATE,
  };
}

export function triggerInsufficientMaterial() {
  return {
    type: ACTION_TYPE.INSUFFICIENT_MATERIAL,
  };
}

export function triggerCheckmate(winner) {
  return {
    type: ACTION_TYPE.WIN,
    payload: winner,
  };
}

export function setupNewGame() {
  return {
    type: ACTION_TYPE.NEW_GAME,
    payload: initGameState,
  };
}
