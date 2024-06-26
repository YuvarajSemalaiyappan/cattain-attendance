import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import UserEditScreen from "./screens/UserEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";

import MyProfile from "./screens/MyProfile";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userAInfo } = userLogin;

  useEffect(() => {
    if (userAInfo && userAInfo.isAdmin) {

    }
  }, [dispatch, userAInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/myprofile" component={MyProfile} />
          <PrivateRouter path="/edit/:id" component={UserEditScreen} />

          
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
