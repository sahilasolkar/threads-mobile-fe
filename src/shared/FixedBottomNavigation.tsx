"use client";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function FixedBottomNavigation() {
  // Ensure the component only runs on the client
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [value, setValue] = React.useState("recents");
  const blacklistedRoutes = ["/login", "/signup"];
  const path = window.location.pathname;

  if (!isMounted) {
    // Render an empty component or loading state while waiting for the client-side render
    return null;
  }

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}>
      <BottomNavigation sx={{ width: "100%" }} value={value}>
        <Link to="/feed">
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        </Link>
        <Link to="/search">
          <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        </Link>
        <Link to="/post">
          <BottomNavigationAction label="Post" icon={<EditNoteIcon />} />
        </Link>
        <Link to="/likes">
          <BottomNavigationAction label="Likes" icon={<FavoriteBorderIcon />} />
        </Link>
        <Link to="/profile">
          <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} />
        </Link>
      </BottomNavigation>
    </Paper>
  );
}
