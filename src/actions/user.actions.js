import axios from "axios";
import { getUsers } from "./users.actions";


export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const GET_USER_ERRORS = "GET_USER_ERRORS";
export const POST_USER = "POST_USER";
export const PUT_USER = "UPDATE_USER";
export const GET_USER_TO_EDIT = "GET_USER_TO_EDIT";
export const DELETE_USER = "DELETE_USER";


export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const AddUser = (data) => {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_URL}api/user/create`, data).then((res) => {
      dispatch({ type: POST_USER, payload: res.data });
    });
  };
};

export const updateUser = (id, userData) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/update/${id}`,
      data: userData,
    })
      .then((res) => {
        dispatch({ type: PUT_USER, payload: res.data._id, userData: res.data });
        dispatch(getUsers());
      })
      .catch((err) => console.log(err));
  };
};

export const getUserToEdit = (data) => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/${data._id}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USER_TO_EDIT, payload: res.data });
      })
      .catch((err) => console.error(err));
  };
};
export const deleteUser = (id) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/delete/${id}`, 
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: id });
        dispatch(getUsers());
      })
      .catch((err) => console.log(err));
  }
}

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};
