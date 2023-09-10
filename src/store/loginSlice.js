import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let userInfoLocalStorage = localStorage.getItem("userInformation")
  ? JSON.parse(localStorage.getItem("userInformation"))
  : {};
const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: userInfoLocalStorage,
    loading: false,
    errorLoginMessage: null,
    errorLogOutMessage: null,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.userData;
      state.errorLoginMessage = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.errorLoginMessage = action.payload.message;
    },
    deleteUser(state, action) {
      state.userInfo = {};
      state.errorLogOutMessage = action.payload.message;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, deleteUser } =
  userSlice.actions;
export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loginRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://darwich.onrender.com/api/users/login",
        {
          email,
          password,
        },
        config
      );

      dispatch(loginSuccess({ userData: data }));
      localStorage.setItem(
        "userInformation",
        JSON.stringify(getState().login.userInfo)
      );
    } catch (error) {
      dispatch(
        loginFail({
          message: error.response.data.message || "user login failed",
        })
      );
    }
  };
};
export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(
        "https://darwich.onrender.com/api/users/logout"
      );
      if (res.status === 200) {
        console.log("hey");
        dispatch(deleteUser());
        localStorage.setItem(
          "userInformation",
          JSON.stringify(getState().login.userInfo)
        );
      }
    } catch (error) {
      dispatch(
        deleteUser({
          message: error?.response?.data.message || "Something went wrong.",
        })
      );
    }
  };
};
export default userSlice.reducer;
