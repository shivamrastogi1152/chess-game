import { ACTION_TYPE } from "../actionType";

export function openPromotion({ fromRow, fromCol, toRow, toCol }) {
  return {
    type: ACTION_TYPE.OPEN_PROMOTION_BOX,
    payload: { fromRow, fromCol, toRow, toCol },
  };
}

export function closePopup() {
  return {
    type: ACTION_TYPE.CLOSE_PROMOTION_BOX,
  };
}
