import React from "react";
import Header from "./../components/Header";
import Sidebar from "./../components/sidebar"
import UserComponent from "../components/users/UserComponent";

const UsersScreen = () => {
  return (
    <>
    <Sidebar/>
      <main className="main-wrap">
        <Header />
        <UserComponent />
      </main>
    </>
  );
};

export default UsersScreen;
