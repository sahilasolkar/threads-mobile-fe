import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import FixedBottomNavigation from "../shared/FixedBottomNavigation";

const Landing = () => {
  return (
    <>
      {/* header static component */}
      {/* <h1
        style={{
          backgroundColor: "white",
          zIndex: "999",
          margin: "0 10px 5px",
          height: "50px",
          width: "100vw",
          position: "fixed",
          top: "0",
          textAlign: "center",
        }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "5vh", height: "10vh", marginBottom: "1rem" }}
        />
      </h1> */}
      <div style={{ marginBottom: "80px" }}>
        <Outlet />
      </div>
      <FixedBottomNavigation />
    </>
  );
};

export default Landing;
