import React, { useEffect, useRef } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, SwipeableDrawer, TextField } from "@mui/material";
import {
  createComment,
  getCommentByPostId,
  getLikesByPostId,
  likePostById,
  unlikePostById,
} from "../services/userService";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const PostCard = ({
  userId,
  id,
  userName,
  content,
  createdAt,
  comment,
}: {
  userId: string;
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
  type Like = {
    __typename: string;
    user: {
      __typename: string;
      id: string;
    };
  };
  type Comment = {
    __typename: string;
    id: string;
    content: string;
    user: {
      __typename: string;
      id: string;
      firstName: string;
    };
    createdAt: string;
  };
  const [isCommentToggled, setIsCommentToggled] = React.useState(false);
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [postId, setPostId] = React.useState("");
  const [userComment, setUserComment] = React.useState("");
  const [commentData, setCommentData] = React.useState<Comment[]>([
    {
      __typename: "",
      id: "",
      user: { firstName: "", __typename: "", id: "" },
      content: "",
      createdAt: "",
    },
  ]);
  const [isLiked, setIsLiked] = React.useState(false);
  const [commentId, setCommentId] = React.useState("");
  const [likeData, setLikeData] = React.useState<Like[]>([]);

  useEffect(() => {
    setLikes();
    setComments(id);
  }, []);

  const isLikedByMe = (likeData: any) => {
    likeData.forEach((like: any) => {
      if (like.user.id === userId) {
        setIsLiked(true);
      }
    });
  };

  const likePost = () => {
    const likeObj = {
      __typename: "Like",
      user: {
        __typename: "User",
        id: userId,
      },
    };
    if (!isLiked) {
      setLikeData((prevLikeData) => [...prevLikeData, likeObj]);
      likePostById({ postId })
        .then((res) => {
          setIsLiked(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const unlikePost = () => {
    if (isLiked) {
      unlikePostById({ postId })
        .then((res) => {
          if (res) {
            if (likeData.length) {
              const filteredLikeData = likeData.filter(
                (like: any) => like.user.id !== userId
              );
              setLikeData(filteredLikeData);
            }
            setIsLiked(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const setLikes = async () => {
    setPostId(id);
    try {
      const res = await getLikesByPostId({ postId: id });
      setLikeData(res);
      isLikedByMe(res);
    } catch (e) {
      console.log(e);
    }
  };

  const setComments = (postId: any) => {
    getCommentByPostId({ postId })
      .then((res) => {
        setCommentData(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const commentObj = {
      __typename: "Comment",
      id: "tempId",
      content: userComment,
      user: {
        __typename: "User",
        id: userId,
        firstName: userName,
      },
      createdAt: new Date().getTime(),
    };
    createComment({ content: userComment, postId })
      .then((res) => {
        setCommentData((previousCommentData: any) => [
          ...previousCommentData,
          commentObj,
        ]);
        setCommentId(res?.id);
        setUserComment("");
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const toggleDrawer =
    (anchor: "bottom", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (!isCommentToggled) {
        getCommentByPostId({ postId })
          .then((res) => {
            setCommentData(res);
            setIsCommentToggled(true);
          })
          .catch((e) => {
            console.log(e);
          });
      }

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

  const list = (anchor: "bottom") => (
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
      {commentData?.map((comment) => (
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
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}>
        <AccountCircleIcon sx={{ height: "30px", width: "30px" }} />
        <div
          style={{
            height: "85%",
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
          <p style={{ fontSize: "12px", color: "#afafaf" }}>{createdAt}</p>
        </div>
        <p style={{ marginTop: "0" }}>{content}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          {isLiked && (
            <FavoriteIcon
              onClick={unlikePost}
              sx={{ border: "black", color: "red" }}
            />
          )}
          {!isLiked && <FavoriteBorderOutlinedIcon onClick={likePost} />}
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
                {list("bottom")}
              </SwipeableDrawer>
            </div>
          </div>
        </div>

        <div
          className="replies-and-comments"
          style={{ color: "#afafaf", fontSize: "14px" }}>
          {commentData?.length} replies . {likeData?.length} likes
        </div>
      </div>
    </div>
  );
};

export default PostCard;
