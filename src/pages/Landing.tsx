import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/threads.png";
import { Button } from "@mui/material";

const Landing = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <img
        src={logo}
        alt="threads-logo"
        style={{ width: "30vh", height: "30vh", marginBottom: "5rem" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Link to="/login">
          <Button
            variant="outlined"
            sx={{
              borderColor: "black",
              color: "#8d99ae",
              width: "50vw",
              marginBottom: "2rem",
            }}>
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            variant="outlined"
            sx={{ borderColor: "black", color: "#8d99ae", width: "50vw" }}>
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
