import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/Header";
import ProfileTabs from "../components/users/ProfileTabs";
import ProfileTabsCopy from "../components/users/ProfileTabscopy";
import moment from "moment";

const UserEditScreen = () => {
  const history = useHistory(); // Import useHistory hook
  window.scrollTo(0, 0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Back button click handler
  const goBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src="https://i.postimg.cc/HkmXtrbf/9440461.jpg" alt="userprofileimage" />
                </div>
                {userInfo && (
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>{userInfo.name}</strong>
                    </h5>
                    <span className="author-card-position">
                      <>Joined {moment(userInfo.createdAt).format("LL")}</>
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="true"
                  >
                    Profile Settings
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-attendance-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-attendance"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-attendance"
                    aria-selected="false"
                  >
                    Attendance
                  </button>
                </div>
              </div>
            </div>
            {/* Back button */}
            <button onClick={goBack} className="btn btn-secondary mt-3">Back</button>
          </div>
          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <ProfileTabs />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-attendance"
              role="tabpanel"
              aria-labelledby="v-pills-attendance-tab"
            >
              <ProfileTabsCopy />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditScreen;
