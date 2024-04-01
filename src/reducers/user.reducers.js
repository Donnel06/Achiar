import {
  DELETE_USER,
  GET_USER,
  GET_USER_TO_EDIT,
  POST_USER,
  PUT_USER,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {
  users: []
};

export default function userReducer(state = initialState, action) {
  console.log('State:', state);
  //console.log('Action:', action);
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case POST_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case PUT_USER:
      return {
        ...state,
        users: action.payload // Met à jour la liste des utilisateurs avec les données reçues dans l'action
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case GET_USER_TO_EDIT:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    default:
      return state;
  }
}
