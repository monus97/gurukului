import {
  ERROR,
  GET_ALL_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from "../actionTypes";

const initialState = {
  error: false,
  registerData: null,
  loginData: null,
  allUsers: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        error: false,
        registerData: action.payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loginData: action.payload,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        error: false,
        allUsers: action.payload,
      };

    case ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
