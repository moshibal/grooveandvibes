import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../utilities/wrapper";
import { deleteBookings, fetchBookings } from "../store/bookingListSlice";

import Loader from "../utilities/Loader";
import Message from "../utilities/Message";
import { Link } from "react-router-dom";
const BookingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //global states
  const { bookings, loading, error, deleteMessage } = useSelector(
    (state) => state.bookingList
  );
  const { userInfo } = useSelector((state) => state.login);
  // effects
  useEffect(() => {
    if (!userInfo?.data?.isAdmin) {
      navigate("/");
    } else if (deleteMessage || userInfo?.data?.isAdmin) {
      dispatch(fetchBookings());
    }
  }, [userInfo, navigate, dispatch, deleteMessage]);

  //handlers
  const handlePhoneCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };
  const deleteBookingHandler = (bookingId) => {
    dispatch(deleteBookings(bookingId));
  };
  return (
    <Wrapper>
      <div className="row">
        <div className="col text-end appButton">
          <Link
            to="/registration"
            style={{
              border: "1px solid black",
              padding: "1rem",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Register Student
          </Link>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <caption>List of Bookings</caption>
            <thead>
              <tr className="fs-4">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((student) => (
                <tr key={student._id} className="fs-4">
                  <td>{student._id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>

                  <td>
                    <Link
                      className="appButton"
                      to="#"
                      onClick={() => handlePhoneCall(student.phone)}
                    >
                      {student.phone}
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteBookingHandler(student._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Wrapper>
  );
};

export default BookingScreen;
