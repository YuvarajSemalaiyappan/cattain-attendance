import React from "react";
import Header from "../components/Header";
import ProfileTabs from "../components/users/ProfileTabs";


const MyProfile = () => {
  return (
    <>
      <main className="main-wrap">
        <Header />
        <ProfileTabs/>
      </main>
    </>
  );
};

export default MyProfile;
