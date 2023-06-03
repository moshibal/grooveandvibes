import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const studentListSlice = createSlice({
  name: "studentListSlice",
  initialState: { students: [], loading: false, error: "" },
  reducers: {
    studentRequest(state) {
      state.loading = true;
    },
    studentSuccess(state, action) {
      state.loading = false;
      state.students = action.payload.data.students;
    },
    studentFail(state, action) {
      state.loading = false;
      state.error = action.payload.fail;
    },
  },
});

const { studentRequest, studentSuccess, studentFail } =
  studentListSlice.actions;
export const fetchStudents = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(studentRequest());
      // Set the authentication token in Axios

      const { token } = getState().login.userInfo.data;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      const { data } = await axios.get(
        "https://api.darwichmeats.com/api/vibeRigistration"
      );

      dispatch(studentSuccess({ data }));
    } catch (error) {
      dispatch(studentFail({ fail: "register failed." }));
    }
  };
};
const updateStudentSlice = createSlice({
  name: "updateStudentSlice",
  initialState: { success: "", loading: false, error: "" },
  reducers: {
    updateStudentRequest(state) {
      state.loading = true;
    },
    updateStudentSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
    },
    updateStudentFail(state, action) {
      state.loading = false;
      state.error = action.payload.fail;
    },
  },
});
const { updateStudentRequest, updateStudentSuccess, updateStudentFail } =
  updateStudentSlice.actions;
export const updateAttendance = (updateobject) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateStudentRequest());
      // Set the authentication token in Axios

      const { token } = getState().login.userInfo.data;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      const { data } = await axios.patch(
        "https://api.darwichmeats.com/api/vibeRigistration/attendance",
        updateobject
      );

      dispatch(updateStudentSuccess({ success: data.message }));
    } catch (error) {
      dispatch(
        updateStudentFail({
          fail: error.data.message || "something went wrong",
        })
      );
    }
  };
};

export const deleteStudent = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateStudentRequest());
      // Set the authentication token in Axios

      const { token } = getState().login.userInfo.data;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `https://api.darwichmeats.com/api/vibeRigistration/attendance/${id}`,

        config
      );

      dispatch(updateStudentSuccess({ success: data.message }));
    } catch (error) {
      dispatch(
        updateStudentFail({
          fail: error.data.message || "something went wrong",
        })
      );
    }
  };
};

export default studentListSlice.reducer;
