import React, { useEffect } from "react";
import { getUserPost } from "../services/userService";
import { Button } from "@mui/material";
import ActivityCard from "../shared/ActivityCard";

const Likes = () => {
  const [notifications, setNotifications] = React.useState([
    {
      __typename: "",
      content: "",
      id: "",
      user: {
        __typename: "",
        firstName: "",
        lastName: "",
      },
      createdAt: "",
      postContent: "",
    },
  ]);
  const [allNotifications, setAllNotifications] = React.useState([
    {
      __typename: "",
      content: "",
      id: "",
      user: {
        __typename: "",
        firstName: "",
        lastName: "",
      },
      createdAt: "",
      postContent: "",
    },
  ]);
  const [buttonType, setButtonType] = React.useState("all");

  useEffect(() => {
    getUserPost()
      .then((res) => {
        setUserNotifications(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const setUserNotifications = (data: any) => {
    let notificationArray: any = [];
    data.forEach((post: any) => {
      // Include comments with post content
      if (post.comments && post.comments.length > 0) {
        const commentsWithPostContent = post.comments.map((comment: any) => ({
          ...comment,
          postContent: post.content, // Add the post content to the comment object
        }));
        notificationArray = notificationArray.concat(commentsWithPostContent);
      }

      // Include likes with post content
      if (post.likes && post.likes.length > 0) {
        const likesWithPostContent = post.likes.map((like: any) => ({
          ...like,
          postContent: post.content, // Add the post content to the like object
        }));
        notificationArray = notificationArray.concat(likesWithPostContent);
      }
    });
    setNotifications(sortNotificationsByTimestamp(notificationArray));
    setAllNotifications(sortNotificationsByTimestamp(notificationArray));
  };

  const sortNotificationsByTimestamp = (notifications: any) => {
    return notifications.sort((a: any, b: any) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });
  };

  const handleChangeActivity = (selectedButton: string) => {
    setButtonType(selectedButton);
    const notificationsArray = allNotifications;
    switch (selectedButton) {
      case "likes":
        setNotifications(notificationsArray.filter((val) => !val.content));
        break;
      case "comments":
        setNotifications(notificationsArray.filter((val) => !!val.content));
        break;
      case "all":
        setNotifications(notificationsArray);
        break;
    }
  };

  const getRelativeTime = (timestamp: any) => {
    const now = new Date();
    const timeDifference = now.getTime() - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}hr ago`;
    } else if (minutes > 0) {
      return `${minutes}min ago`;
    } else {
      return `${seconds}s ago`;
    }
  };

  return (
    <div style={{ margin: "0 10px 0" }}>
      <h1 style={{ margin: "10px 0 10px" }}>Activity</h1>
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
        className="segregate-buttons-container">
        <Button
          onClick={() => handleChangeActivity("all")}
          style={{
            border: "2px solid black",
            color: buttonType == "all" ? "white" : "black",
            height: "30px",
            background: buttonType == "all" ? "black" : "white",
          }}>
          All
        </Button>
        <Button
          onClick={() => handleChangeActivity("likes")}
          style={{
            border: "2px solid black",
            color: buttonType == "likes" ? "white" : "black",
            height: "30px",
            background: buttonType == "likes" ? "black" : "white",
          }}>
          Likes
        </Button>
        <Button
          onClick={() => handleChangeActivity("comments")}
          style={{
            border: "2px solid black",
            color: buttonType == "comments" ? "white" : "black",
            height: "30px",
            background: buttonType == "comments" ? "black" : "white",
          }}>
          Comments
        </Button>
      </div>
      <div className="activity-container">
        {notifications.map((val) => (
          <ActivityCard
            isCommentNotification={!!val.content}
            isLikeNotification={!val.content}
            content={val.postContent}
            username={val?.user?.firstName}
            createdAt={getRelativeTime(val.createdAt)}
            key={val.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Likes;
