import React, { useEffect, useState } from "react";
import { getFeed } from "../services/userService";
import { Box, Button, CircularProgress, SwipeableDrawer } from "@mui/material";
import PostCard from "../shared/PostCard";
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
    console.log(token);
    getCurrentLoggedInUser(token || "").then((res) => {
      setUserId(res.id);
    });
  }, []);

  if (loading) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <div>
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
  );
};

export default Feed;
