import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUserProfile, getUserDetails } from "../../Redux/Actions/userActions";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import { toast } from "react-toastify";

const ProfileTabscopy = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [toastId, setToastId] = useState(null); // State to hold toast ID
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editIndex, setEditIndex] = useState(-1); // State to track the index being edited
  const [savedRows, setSavedRows] = useState([]); // State to track saved rows
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  const userDetails = useSelector((state) => state.userDetails) || {};
  const { loading, error, user } = userDetails;

  const userUpdateProfileState = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfileState || {};

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      
      if (user.attendance && Array.isArray(user.attendance)) {
        const formattedAttendance = user.attendance.map(entry => ({
          date: new Date(entry.date).toISOString().split('T')[0], // Convert date to ISO string format (YYYY-MM-DD)
          status: entry.status,
          loginTime: entry.loginTime || "", // Add loginTime property with default value
          logoutTime: entry.logoutTime || "", // Add logoutTime property with default value
          saved: false // Add saved property with default value
        }));
        setAttendanceData(formattedAttendance);
      }
    }
  }, [user]);

  const handleAttendanceChange = (index, key, value) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[index][key] = value;
    setAttendanceData(updatedAttendance);
  };

  const handleAddAttendanceRow = () => {
    const today = new Date().toISOString().split('T')[0];
    setAttendanceData([...attendanceData, { date: today, status: "", loginTime: "", logoutTime: "", saved: false }]);
  };

  const handleRemoveAttendanceRow = (index) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance.splice(index, 1);
    setAttendanceData(updatedAttendance);
  };

  const handleEdit = (index) => {
    setEditMode(true); // Enable edit mode
    setEditIndex(index); // Set the index being edited
  };

  const handleSave = () => {
    dispatch(updateUserProfile({ id: user._id, name, email, mobile, password, attendance: attendanceData }));
    if (!toast.isActive(toastId)) {
      setToastId(toast.success("Attendance Updated", Toastobjects));
    }
    setEditMode(false); // Disable edit mode after saving
    setEditIndex(-1); // Reset the index being edited
  
    // Reset saved status of the rows
    const updatedAttendance = attendanceData.map((entry, index) => ({
      ...entry,
      saved: savedRows.includes(index) ? true : false,
    }));
    
    setAttendanceData(updatedAttendance); // Update attendance data
    setSavedRows([]); // Clear saved rows
    window.location.reload();

  };

  const onSave = (index) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[index].saved = true; // Set saved status to true
    setAttendanceData(updatedAttendance); // Update attendance data
    setSavedRows([...savedRows, index]); // Add index to savedRows
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row form-container" onSubmit={(e) => e.preventDefault()}>

        {/* Attendance table */}
        <div className="col-md-12">
          <h3>Attendance</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Login Time</th> {/* New column */}
                <th>Logout Time</th> {/* New column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="date"
                      value={attendance.date}
                      onChange={(e) =>
                        handleAttendanceChange(index, "date", e.target.value)
                      }
                      disabled={!editMode || index !== editIndex}
                    />
                  </td>
                  <td>
                    <select
                      value={attendance.status}
                      onChange={(e) =>
                        handleAttendanceChange(index, "status", e.target.value)
                      }
                      disabled={!editMode || index !== editIndex}
                    >
                      <option value="">Select Status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={attendance.loginTime}
                      onChange={(e) =>
                        handleAttendanceChange(index, "loginTime", e.target.value)
                      }
                      disabled={!editMode || index !== editIndex}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={attendance.logoutTime}
                      onChange={(e) =>
                        handleAttendanceChange(index, "logoutTime", e.target.value)
                      }
                      disabled={!editMode || index !== editIndex}
                    />
                  </td>
                  <td>
                    {editMode ? (
                      <button onClick={handleSave}>Save</button>
                    ) : (
                      <button onClick={() => handleEdit(index)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={handleAddAttendanceRow} >
            Add Row
          </button>
        </div>
        
        {editMode && (
          <button type="submit" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        )}
      </form>
    </>
  );
};

export default ProfileTabscopy;
