/* eslint-disable @typescript-eslint/no-explicit-any */

import { types } from "./typesReducer";

function SessionReducer(state: any, action: any) {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.user,
      };
    case types.logout:
      return {
        ...state,
        logged: false,
        user: action.user,
      };
    default:
      return state;
  }
}

export default SessionReducer;
