import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: { success: false, loading: false, error: "" },
  reducers: {
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload.fail;
    },
  },
});

export const { registerRequest, registerSuccess, registerFail } =
  registerSlice.actions;
export const register = (registerObj) => {
  return async (dispatch, getState) => {
    try {
      dispatch(registerRequest());
      // Set the authentication token in Axios

      const { token } = getState().login.userInfo.data;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      await axios.post(
        "https://darwich.onrender.com/api/vibeRigistration",
        registerObj
      );

      dispatch(registerSuccess());
    } catch (error) {
      dispatch(registerFail({ fail: "register failed." }));
    }
  };
};

export default registerSlice.reducer;
