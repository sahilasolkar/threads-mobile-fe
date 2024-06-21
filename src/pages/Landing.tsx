import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo/threads.png";
import { Button } from "@mui/material";
import FixedBottomNavigation from "../shared/FixedBottomNavigation";

const Landing = () => {
  return (
    <>
      <h1
        style={{
          backgroundColor: "white",
          zIndex: "999",
          margin: "0 10px 5px",
          height: "50px",
          width: "100vw",
          position: "fixed",
          top: "0",
        }}>
        Threads
      </h1>
      <div style={{ marginTop: "60px", marginBottom: "80px"}}>
        <Outlet />
      </div>
      <FixedBottomNavigation />
    </>
  );
};

export default Landing;
