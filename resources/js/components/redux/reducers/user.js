import { USER_AUTHENTICATED } from "../actionTypes";

const initialState = {
  authed: "false",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_AUTHENTICATED: {
      const authed = action.payload;
      return {
        ...state,
        authed: {
          ...state.authed,
          authed: authed
        }
      };
    }
    default:
      return state;
  }
}
