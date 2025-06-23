import { USER_DATA } from "./action";

let initialState = {
  UserData: {},
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
    // console.log(action.payload)
    return { ...state, UserData: action.payload };
    case "UPDATE_USER_DATA":
      return {
        ...state,
        UserData: {
          ...state.UserData,
          [action.payload.field]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
