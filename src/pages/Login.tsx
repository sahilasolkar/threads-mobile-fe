"use client";
import React from "react";
import { Button, Paper, TextField } from "@mui/material";
import logo from "../assets/logo/threads.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("inside handlesubmit");
    try {
      await login({ email, password });
      navigate("/feed")
      // window.location.href = "/feed";
    } catch (error: any) {
      console.error("Failed to login:", error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <div style={{ position: "fixed", top: "1rem", left: "1rem" }}>
        <Link to="/">
          <ArrowBackIosIcon sx={{ color: "black" }} />
        </Link>
      </div>
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
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ marginBottom: "2rem", height: "36.5px" }}
        />
        <TextField
          id="outlined-basic"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          type="password"
          variant="outlined"
          sx={{ height: "36.5px" }}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        sx={{
          position: "fixed",
          bottom: "3rem",
          color: "white",
          backgroundColor: "black",
          width: "50vw",
        }}>
        Login
      </Button>
    </form>
  );
};

export default Login;
