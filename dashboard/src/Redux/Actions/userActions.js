import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_SEND_OTP_FAIL,
  USER_SEND_OTP_REQUEST,
  USER_SEND_OTP_SUCCESS,
  USER_VERIFY_OTP_FAIL,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
  USER_RESEND_OTP_REQUEST,
  USER_RESEND_OTP_FAIL,
  USER_RESEND_OTP_SUCCESS,
  UPDATE_USER_ATTENDANCE_REQUEST,
  UPDATE_USER_ATTENDANCE_SUCCESS,
  UPDATE_USER_ATTENDANCE_FAIL,
} from "../Constants/UserContants";
import axios from "axios";
import { toast } from "react-toastify";

// LOGIN WITH OTP
export const loginWithOTP = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/user/login`,
      { email, otp },
      config
    );

   
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userAInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SEND OTP LOGIN
export const sendOtpLogin = (email, mobile, name) => async (dispatch) => {
  try {
    dispatch({ type: USER_SEND_OTP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`/api/user/register`, { email , mobile, name}, config);

    dispatch({ type: USER_SEND_OTP_SUCCESS });
    return true;
  } catch (error) {

    dispatch({
      type: USER_SEND_OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

// RESEND OTP
export const resendOtp = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESEND_OTP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`/api/user/send-otp`, { email }, config);

    dispatch({ type: USER_RESEND_OTP_SUCCESS });
    return true;

  } catch (error) {

    dispatch({
      type: USER_RESEND_OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;

  }
};

// VERIFY OTP
export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_OTP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`/api/user/verify-otp`, { email, otp }, config);

    dispatch({ type: USER_VERIFY_OTP_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userAInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};

// ALL USER
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userAInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userAInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};
// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
   
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userAInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userAInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user/${id}`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// SEND OTP REGISTRATION
export const sendOtp = (email, mobile, name) => async (dispatch) => {
  try {
    dispatch({ type: USER_SEND_OTP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(`/api/user/send-otp`, { email , mobile, name}, config);

    dispatch({ type: USER_SEND_OTP_SUCCESS });
    return true;
  } catch (error) {

    dispatch({
      type: USER_SEND_OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

// UPDATE PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userAInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/user/profile`, user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userAInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const updateUserAttendance = (attendance) => async (dispatch, getState) => {
  try {

console.log(attendance._id)    
    dispatch({ type: UPDATE_USER_ATTENDANCE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/user/attendance/${attendance._id}`, attendance, config);

    dispatch({ type: UPDATE_USER_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: UPDATE_USER_ATTENDANCE_FAIL,
      payload: message,
    });
  }
};
