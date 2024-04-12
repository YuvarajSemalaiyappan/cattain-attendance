import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer, userDetailsReducer, updateUserAttendanceReducer } from "./Reducers/userReducers";


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userAttendance : updateUserAttendanceReducer,
  userDetails: userDetailsReducer,

});

// login
const userAInfoFromLocalStorage = localStorage.getItem("userAInfo")
  ? JSON.parse(localStorage.getItem("userAInfo"))
  : null;

const initialState = {
  userLogin: { userAInfo: userAInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
