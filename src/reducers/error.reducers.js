import { GET_USERS } from "../actions/users.actions";

const initialState = { userError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      if (action.error) { // Check if the action has an 'error' property
        return { userError: [action.error] }; // Update userError with the error
      }
      return state; // No error, return current state
    default:
      return state;
  }
}
