import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_RESEND_OTP_REQUEST,
  USER_RESEND_OTP_SUCCESS,
  USER_RESEND_OTP_FAIL,
  USER_SEND_OTP_REQUEST,
  USER_SEND_OTP_FAIL,
  USER_SEND_OTP_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  UPDATE_USER_ATTENDANCE_REQUEST,
  UPDATE_USER_ATTENDANCE_SUCCESS,
  UPDATE_USER_ATTENDANCE_FAIL

} from "../Constants/UserContants";

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_SEND_OTP_REQUEST:
      return { loading: true };
    case USER_RESEND_OTP_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userAInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, isOtpSent: true, isOtpResend: true };
    case USER_SEND_OTP_FAIL:
      return { loading: false, error: action.payload, isOtpSent: false };
    case USER_SEND_OTP_SUCCESS:
      return { loading: false, error: action.payload, isOtpSent: true };
    case USER_RESEND_OTP_SUCCESS:
      return { loading: false, error: action.payload, isOtpResend: true };
    case USER_RESEND_OTP_FAIL:
      return { loading: false, error: action.payload, isOtpResend: false };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userAInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPdate attendance
export const updateUserAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_ATTENDANCE_REQUEST:
      return { loading: true };
    case UPDATE_USER_ATTENDANCE_SUCCESS:
      return { loading: false, success: true, attendance: action.payload };
    case UPDATE_USER_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};