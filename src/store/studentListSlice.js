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
      state.error = "";
    },
    studentFail(state, action) {
      state.loading = false;
      state.error = action.payload.fail;
    },
  },
});

const { studentRequest, studentSuccess, studentFail } =
  studentListSlice.actions;
export const fetchStudents = (filterObject) => {
  return async (dispatch, getState) => {
    try {
      const group = filterObject.filterStudent;

      dispatch(studentRequest());
      // Set the authentication token in Axios

      const { token } = getState().login.userInfo.data;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      const { data } = await axios.get(
        `https://darwich.onrender.com/api/vibeRigistration?selectedGroup=${group}`
      );

      dispatch(studentSuccess({ data }));
    } catch (error) {
      dispatch(
        studentFail({
          fail: error.response.data.message || "something went wrong",
        })
      );
    }
  };
};
const updateStudentSlice = createSlice({
  name: "updateStudentSlice",
  initialState: { success: "", update: false, loading: false, error: "" },
  reducers: {
    updateStudentRequest(state) {
      state.loading = true;
      state.update = false;
    },
    updateStudentSuccess(state, action) {
      state.loading = false;
      state.update = true;
      state.success = action.payload.success;
    },
    updateStudentFail(state, action) {
      state.loading = false;
      state.update = false;
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
        "https://darwich.onrender.com/api/vibeRigistration/attendance",
        updateobject
      );

      dispatch(updateStudentSuccess({ success: data.message }));
    } catch (error) {
      dispatch(
        updateStudentFail({
          fail: error.response.data.message || "something went wrong",
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
        `https://darwich.onrender.com/api/vibeRigistration/${id}`,

        config
      );

      dispatch(updateStudentSuccess({ success: data.message }));
    } catch (error) {
      dispatch(
        updateStudentFail({
          fail: error.response.data.message || "something went wrong",
        })
      );
    }
  };
};
export const updateStudentReducer = updateStudentSlice.reducer;
export default studentListSlice.reducer;
