import { AccountCircle } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tab } from "@mui/base/Tab";
import { Tabs } from "@mui/base/Tabs";
import React, { useEffect } from "react";
import { getUserPost } from "../services/userService";
import PostCard from "../shared/PostCard";
import { getCurrentLoggedInUser } from "../services/authService";

const Profile = () => {
  const [tab, setTab] = React.useState("posts");
  const [feed, setFeed] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    getUserPost()
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
      setUserName(res.firstName);
      setEmail(res.email);
    });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const onChangeTab = (tabName: any) => {
    setTab(tabName);
  };

  return (
    <div style={{ margin: "0 10px 0" }}>
      {/* <button onClick={handleLogOut}>Logout</button> */}
      <div
        className="user-details"
        style={{
          margin: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div className="details">
          <h2>{userName}</h2>
          <p>{email}</p>
        </div>
        <AccountCircle style={{ width: "70px", height: "70px" }} />
      </div>
      <div
        className="action-button-container"
        style={{ display: "flex", gap: "10px" }}>
        <Button
          style={{
            width: "100%",
            border: "1px solid #a3a3a3",
            textTransform: "none",
            color: "black",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: "600",
          }}>
          Edit Profile
        </Button>
        <Button
          style={{
            width: "100%",
            border: "1px solid #a3a3a3",
            textTransform: "none",
            color: "black",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: "600",
          }}>
          Share Profile
        </Button>
      </div>
      <div className="content-container" style={{ margin: "20px 0 0 0" }}>
        <Tabs defaultValue={0} style={{ margin: "10px 0 0 0" }}>
          <TabsList
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}>
            <Tab
              style={{
                border: "none",
                background: "none",
                width: "100%",
                borderBottom:
                  tab == "posts" ? "2px solid black" : "2px solid white",
              }}
              value={0}>
              <p onClick={() => onChangeTab("posts")}>Posts</p>
            </Tab>
            <Tab
              style={{
                border: "none",
                background: "none",
                width: "100%",
                borderBottom:
                  tab == "replies" ? "2px solid black" : "2px solid white",
              }}
              value={1}>
              <p onClick={() => onChangeTab("replies")}>Replies</p>
            </Tab>
            <Tab
              style={{
                border: "none",
                background: "none",
                width: "100%",
                borderBottom:
                  tab == "reposts" ? "2px solid black" : "2px solid white",
              }}
              value={2}>
              <p onClick={() => onChangeTab("reposts")}>Reposts</p>
            </Tab>
          </TabsList>
          <TabPanel value={0}>
            <div className="posts-content">
              {loading ? (
                <CircularProgress />
              ) : (
                feed?.map((post: any) => (
                  <PostCard
                    userId={userId}
                    key={post.id}
                    id={post.id}
                    userName={post?.user?.firstName}
                    content={post.content}
                    createdAt={new Date(
                      parseInt(post.createdAt)
                    ).toLocaleDateString()}
                    comment={post.comments}
                  />
                ))
              )}
            </div>
          </TabPanel>
          <TabPanel value={1}>Profile page</TabPanel>
          <TabPanel value={2}>Language page</TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
