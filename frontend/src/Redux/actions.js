import { USER_DATA, USER_LOGIN_ID } from "./action";

export const setUserData = (data) => ({
  type: USER_DATA,
  payload: data,
});

export const setUserID = (data) => ({
  type: USER_LOGIN_ID,
  payload: data,
});

export const updateUserdata = (field,value) =>({
  type:"UPDATE_USER_DATA",
  payload:{field,value}
});
