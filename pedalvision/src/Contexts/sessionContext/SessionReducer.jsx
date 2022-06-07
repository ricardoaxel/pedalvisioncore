import { initialState } from "./sessionContext";
export function sessionReducer(state, action) {
  switch (action.type) {
    //Example
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }

    default:
      break;
  }
  return state;
}
