import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../utilities/wrapper";
import {
  deleteStudent,
  fetchStudents,
  updateAttendance,
} from "../store/studentListSlice";

import Loader from "../utilities/Loader";
import Message from "../utilities/Message";
import { Link } from "react-router-dom";
const StudentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //global states
  const { students, loading, error } = useSelector(
    (state) => state.studentList
  );
  const { update, error: updateStudentError } = useSelector(
    (state) => state.updateStudentList
  );
  const { userInfo } = useSelector((state) => state.login);
  //EFFECTS
  useEffect(() => {
    if (!userInfo?.data?.isAdmin) {
      navigate("/");
    } else {
      dispatch(fetchStudents());
    }
  }, [userInfo, navigate, dispatch]);
  useEffect(() => {
    if (!userInfo?.data?.isAdmin) {
      navigate("/");
    } else if (update) {
      dispatch(fetchStudents());
    }
  }, [update, userInfo, navigate, dispatch]);
  //handelers
  const addAttendenceHandler = (studenID) => {
    dispatch(updateAttendance({ _id: studenID }));
  };
  const resetAttendenceHandler = (studenID) => {
    dispatch(updateAttendance({ _id: studenID, reset: 0 }));
  };
  const deleteStudentHandler = (studenID) => {
    dispatch(deleteStudent(studenID));
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
        {updateStudentError && <p>{updateStudentError}</p>}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
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
                <th scope="col">Classes</th>
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
                  <td>{student.selectedClass}</td>
                  <td>
                    <button
                      className="appButton"
                      onClick={() => {
                        addAttendenceHandler(student._id);
                      }}
                    >
                      Add day
                    </button>
                  </td>
                  <td>
                    <button
                      className="appButton"
                      onClick={() => {
                        resetAttendenceHandler(student._id);
                      }}
                    >
                      Reset day
                    </button>
                    <button
                      className="appButton"
                      onClick={() => {
                        deleteStudentHandler(student._id);
                      }}
                    >
                      Delete Student
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

export default StudentScreen;
