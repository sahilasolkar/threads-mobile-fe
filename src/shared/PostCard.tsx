import React, { useEffect, useRef } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, SwipeableDrawer, TextField } from "@mui/material";
import { createComment, getCommentByPostId } from "../services/userService";

const PostCard = ({
  id,
  userName,
  content,
  createdAt,
  comment,
}: {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
  comment?: {
    id: string;
    content: string;
    createdAt: string;
    user: { id: string; firstName: string };
  }[];
}) => {
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [postId, setPostId] = React.useState("");
  const [userComment, setUserComment] = React.useState("");

  useEffect(() => {
    setPostId(id);
  }, []);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createComment({ content: userComment, postId })
      .then((res) => {
        console.log(res);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const toggleDrawer =
    (anchor: "bottom", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      // getCommentByPostId
      getCommentByPostId({ postId })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });

      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (
    anchor: "bottom",
    data?: {
      id: string;
      content?: string;
      createdAt?: string;
      user?: { id?: string; firstName?: string };
    }[]
  ) => (
    <Box
      className="testclass"
      sx={{
        width: "auto",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      {data?.map((comment) => (
        <div
          key={comment.id}
          style={{ display: "flex", gap: "0.5rem", padding: "10px" }}>
          <AccountCircleIcon />
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}>
              <Box sx={{ fontSize: "16px", fontWeight: "700" }}>
                {comment.user?.firstName}
              </Box>
            </div>
            <p>{comment.content}</p>
            <Box
              sx={{
                fontSize: "11px",
                color: "#adb5bd",
                display: "flex",
                alignItems: "center",
              }}>
              {new Date(
                parseInt(comment.createdAt || "0")
              ).toLocaleDateString()}
            </Box>
          </div>
        </div>
      ))}

      {/* comment */}
      <form
        onSubmit={handleCommentSubmit}
        style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          id="comment-input"
          value={userComment}
          onChange={(e) => {
            e.stopPropagation();
            setUserComment(e.target.value);
          }}
          label="Comment"
          type="text"
          variant="outlined"
          sx={{ height: "20px", margin: "1rem" }}
        />
        <Button
          onClick={(e) => e.stopPropagation()}
          sx={{ height: "30px", margin: "2rem 1rem" }}
          variant="contained"
          type="submit">
          Add Comment
        </Button>
      </form>
    </Box>
  );
  return (
    <div style={{ display: "flex", gap: "10px", margin: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <AccountCircleIcon sx={{ height: "30px", width: "30px" }} />
        <div
          style={{
            height: "60%",
            width: "2px",
            backgroundColor: "#ced4da",
          }}></div>
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <h4 style={{ marginTop: "10px" }}>{userName}</h4>
          <p>{createdAt}</p>
        </div>
        <p>{content}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <FavoriteBorderIcon />
          <div>
            <div onClick={toggleDrawer("bottom", true)}>
              <ChatBubbleOutlineIcon />
            </div>
            <div>
              <SwipeableDrawer
                sx={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  overflow: "hidden",
                }}
                anchor="bottom"
                open={state.bottom}
                onClose={toggleDrawer("bottom", false)}
                onOpen={toggleDrawer("bottom", true)}>
                {list("bottom", comment)}
              </SwipeableDrawer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
