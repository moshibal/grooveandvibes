import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import studentReducer from "./studentListSlice";
import bookingReducer from "./bookingListSlice";
import { updateStudentReducer } from "./studentListSlice";
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    studentList: studentReducer,
    bookingList: bookingReducer,
    updateStudentList: updateStudentReducer,
  },
});
export default store;
