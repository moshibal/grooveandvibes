import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../utilities/wrapper";
import { fetchStudents } from "../store/studentListSlice";

import Loader from "../utilities/Loader";
import Message from "../utilities/Message";
import { Link } from "react-router-dom";
const StudentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(
    (state) => state.studentList
  );
  const { userInfo } = useSelector((state) => state.login);
  useEffect(() => {
    if (userInfo?.data?.email !== "manial@gmail.com") {
      navigate("/");
    } else {
      dispatch(fetchStudents());
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <Wrapper>
      <div className="row">
        <div className="col text-end appButton">
          <Link to="/registration">Register Student</Link>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <caption>List of students</caption>
            <thead>
              <tr className="fs-4">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Attendance</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="fs-4">
                  <td>{student._id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.attendance}</td>
                  <td>
                    <button className="appButton">Add day</button>
                  </td>
                  <td>
                    <button className="appButton">Reset day</button>
                    <button className="appButton">Delete Student</button>
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

export default StudentScreen;
