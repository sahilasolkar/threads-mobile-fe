import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Post from "./pages/Post";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import PrivateRoute from "./shared/PrivateRoute";
import PublicRoute from "./shared/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Landing />
            </PrivateRoute>
          }>
          <Route path="feed" element={<Feed />} />
          <Route path="search" element={<Search />} />
          <Route path="post" element={<Post />} />
          <Route path="likes" element={<Likes />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
