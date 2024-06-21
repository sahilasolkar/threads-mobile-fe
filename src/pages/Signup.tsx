"use client";
import React from "react";
import { Button, TextField } from "@mui/material";
import logo from "../assets/logo/threads.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login, signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    signup({ firstName, lastName, email, password })
      .then((res: string) => {
        localStorage.setItem("userId", res);
      })
      .catch((e: any) => {
        console.log(e);
      })
      .finally(() => {
        login({ email, password })
          .then((res: string) => {
            localStorage.setItem("token", res);
            navigate("/user/feed");
          })
          .catch((e) => {
            console.log(e);
          });
      });
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          height: "90%",
        }}>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "spaceBetween",
            flexDirection: "column",
          }}>
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <img
              src={logo}
              alt="threads-logo"
              style={{ width: "30vh", height: "30vh" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <TextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              sx={{ marginBottom: "2rem", height: "36.5px" }}
            />
            <TextField
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              sx={{ marginBottom: "2rem", height: "36.5px" }}
            />
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
              sx={{ height: "36.5px", marginBottom: "2rem" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "black",
                width: "50vw",
              }}>
              Login
            </Button>
          </div>
        </div>
      </form>
      <div
        style={{
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <p style={{ color: "#adb5bd" }}>
          Already have an acount? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
