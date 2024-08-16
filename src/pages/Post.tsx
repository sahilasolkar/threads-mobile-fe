import { AccountCircle } from "@mui/icons-material";
import { Button, TextareaAutosize } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { createNewPost } from "../services/userService";

const Post = () => {
  const useFocus = () => {
    const htmlRef = useRef<HTMLTextAreaElement>(null);
    const setFocus = () => {
      htmlRef.current && htmlRef.current.focus();
    };
    return [htmlRef, setFocus] as const;
  };
  const [inputRef, setInputRef] = useFocus();
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setInputRef();
    setUserName(localStorage.getItem("userName") || "");
  }, []);

  const handlePostSubmit = () => {
    createNewPost({ content, imageUrl: "" })
      .then((res) => setContent(""))
      .catch((e) => console.log(e));
  };

  return (
    <div style={{ margin: "0 10px", height: "88vh", position: "relative" }}>
      <h1 style={{ margin: "10px 0 10px" }}>New thread</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          className="account-icon"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <AccountCircle
            style={{
              height: "30px",
              width: "30px",
            }}
          />
          <div
            style={{
              height: "85%",
              width: "2px",
              backgroundColor: "#ced4da",
            }}></div>
          <AccountCircle style={{ height: "15px" }} />
        </div>
        <div className="post-content">
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>{userName}</h2>
          <TextareaAutosize
            placeholder="Write something"
            minRows={5}
            maxRows={30}
            onChange={(e) => {
              e.stopPropagation();
              setContent(e.target.value);
            }}
            value={content}
            ref={inputRef}
            style={{
              border: "none",
              outline: "none",
              width: "75vw",
            }}
          />
        </div>
      </div>

      <Button
        onClick={handlePostSubmit}
        style={{
          position: "absolute",
          width: "100%",
          bottom: "0",
          background: "#007FFF",
          color: "white",
        }}>
        Post
      </Button>
    </div>
  );
};

export default Post;
