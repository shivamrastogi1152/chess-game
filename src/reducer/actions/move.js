import { ACTION_TYPE } from "../actionType";

export function makeNewMove({ newPosition, moveNotation }) {
  return {
    type: ACTION_TYPE.NEW_MOVE,
    payload: { newPosition, moveNotation },
  };
}

export function updateCandidateMoves({ candidateMoves }) {
  return {
    type: ACTION_TYPE.UPDATE_CANDIDATE_MOVES,
    payload: { candidateMoves },
  };
}

export function clearCandidateMoves() {
  return {
    type: ACTION_TYPE.CLEAR_CANDIDATE_MOVES,
  };
}

export function takeBack() {
  return {
    type: ACTION_TYPE.TAKEBACK,
  };
}
