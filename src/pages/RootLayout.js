import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Component/NavBar";
import Footer from "../Component/Footer";
import LiveChat from "../Component/LiveChat";

// root layout function component
const RootLayout = () => {
  return (
    <>
      <NavBar />
      <LiveChat />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
