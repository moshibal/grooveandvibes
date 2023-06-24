import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const bookingSlice = createSlice({
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    deleteMessage: null,
  },
  name: "BookingSlice",
  reducers: {
    requestBooking: (state, action) => {
      state.loading = true;
    },
    successBooking: (state, action) => {
      state.loading = false;
      state.bookings = action.payload.bookings;
    },
    errorBooking: (state, action) => {
      state.error = action.payload.error;
    },
    deleteBooking: (state, action) => {
      state.deleteMessage = action.payload.message;
    },
    errorDeletingBooking: (state, action) => {
      state.deleteErrorMessage = action.payload.message;
    },
  },
});
const {
  requestBooking,
  successBooking,
  errorBooking,
  deleteBooking,
  errorDeletingBooking,
} = bookingSlice.actions;
export const fetchBookings = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestBooking());
      // Set the authentication token in Axios

      const { token } = getState().login.userInfo.data;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      const {
        data: { bookings },
      } = await axios.get("https://darwich.onrender.com/api/bookings");

      dispatch(successBooking({ bookings }));
    } catch (error) {
      dispatch(errorBooking({ error: "Booking request failed." }));
    }
  };
};
export const deleteBookings = (bookingId) => {
  return async (dispatch, getState) => {
    try {
      // Set the authentication token in Axios

      const { token } = getState().login.userInfo.data;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      const { data } = await axios.delete(
        `https://darwich.onrender.com/api/bookings/${bookingId}`
      );
      if (data.message === "Booking Removed") {
        dispatch(deleteBooking({ message: data.message }));
      }
    } catch (error) {
      dispatch(errorDeletingBooking({ message: "Booking request failed." }));
    }
  };
};

export default bookingSlice.reducer;
