import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import studentReducer from "./studentListSlice";
const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    studentList: studentReducer,
  },
});
export default store;
