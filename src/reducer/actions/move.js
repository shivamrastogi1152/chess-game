import { ACTION_TYPE } from "../actionType";

export function makeNewMove({ newPosition }) {
  return {
    type: ACTION_TYPE.NEW_MOVE,
    payload: { newPosition },
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
