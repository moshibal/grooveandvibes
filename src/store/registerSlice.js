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
  return async (dispatch) => {
    try {
      dispatch(registerRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:4000/api/vibeRigistration",
        registerObj,
        config
      );

      dispatch(registerSuccess());
    } catch (error) {
      dispatch(registerFail({ fail: "register failed." }));
    }
  };
};

export default registerSlice.reducer;
