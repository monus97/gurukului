import { GET_ALL_USER, LOGIN_USER, REGISTER_USER } from "../actionTypes";

export const register = (data) => {
    return {
      type: REGISTER_USER,
      payload : data
    };
  };

export const login = (data) => {
    return {
      type: LOGIN_USER,
      payload : data
    };
  };

export const getAllUsers = () => {
    return {
      type: GET_ALL_USER
    };
  };

