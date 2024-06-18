import "./App.css";
import { Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Post from "./pages/Post";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import FixedBottomNavigation from "./shared/FixedBottomNavigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";

function App() {
  const blacklistedRoutes = ["/signup", "/login", "/"];
  const path = window.location.pathname;

  return (
    <>
      {!blacklistedRoutes.includes(path) && <FixedBottomNavigation />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post" element={<Post />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
