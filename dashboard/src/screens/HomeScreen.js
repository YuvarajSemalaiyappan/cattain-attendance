import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import UserEditScreen from "./UserEditScreen";
import UserComponent from "../components/users/UserComponent";

const HomeScreen = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
      <main className="main-wrap">
      
        <UserComponent/>
        
      </main>
    </>
  );
};

export default HomeScreen;
