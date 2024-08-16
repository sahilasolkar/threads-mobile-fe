import React, { useEffect, useState } from "react";
import { getFeed } from "../services/userService";
import { Box, Button, CircularProgress, SwipeableDrawer } from "@mui/material";
import PostCard from "../shared/PostCard";
import logo from "../assets/logo/threads-seeklogo.svg";
import { getCurrentLoggedInUser } from "../services/authService";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getFeed()
      .then((res) => {
        setFeed(res);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
      });

    const token = localStorage.getItem("token");
    getCurrentLoggedInUser(token || "").then((res) => {
      setUserId(res.id);
      localStorage.setItem("userName", res.firstName);
    });
  }, []);

  if (loading) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <div>
      <h1
        style={{
          backgroundColor: "white",
          zIndex: "999",
          margin: "0 10px 60px",
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
      </h1>
      <div style={{ marginTop: "60px" }}>
        {feed?.map((post: any) => (
          <PostCard
            key={post.id}
            id={post.id}
            userName={post.user.firstName}
            content={post.content}
            createdAt={new Date(parseInt(post.createdAt)).toLocaleDateString()}
            comment={post.comments}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
