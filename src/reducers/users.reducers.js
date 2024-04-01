import { GET_USERS } from "../actions/users.actions";

const initialState = { users: [], error: null };

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      if (action.error) {
        return { users: [], error: action.error }; // Store error in state
      }
      return { users: action.payload, error: null }; // Update users and clear error
    default:
      return state;
  }
}
