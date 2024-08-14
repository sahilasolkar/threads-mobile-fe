import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchCard from "../shared/SearchCard";
import Divider from "@mui/material/Divider";
import { getAllUsers, getFollowing } from "../services/userService";
import { Autocomplete, TextField } from "@mui/material";

const Search = () => {
  const [users, setAllUsers] = React.useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      id: "",
      followers: [{ id: "" }],
      isFollowing: false,
    },
  ]);
  const [displayUsers, setDisplayUsers] = React.useState([
    { firstName: "", lastName: "", email: "", id: "", followers: [{ id: "" }] },
  ]);
  const [input, setInput] = React.useState("");
  const [followingUsers, setFollowingUsers] = React.useState([
    { id: "", firstName: "" },
  ]);

  useEffect(() => {
    setUsers();
    setFollowing();
  }, []);

  const setUsers = async () => {
    try {
      const res = await getAllUsers({ limit: 10, offset: 0 });
      setAllUsers(res);
      console.log(res);
      setDisplayUsers(res);
    } catch (e) {
      console.log(e);
    }
  };

  const setFollowing = async () => {
    try {
      let tempFollowerList: string[];
      const res = await getFollowing();
      setFollowingUsers(res);
      console.log(res);
      // res.forEach((element: any) => {
      //   tempFollowerList.push(element.id);
      // });
      // users.forEach((element: any) => {
      //   element.isFollowing = tempFollowerList.includes(element.id);
      // });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event: any) => {
    if (event.key === "Enter") {
      searchAllUsers(input);
    }
  };

  const searchAllUsers = (name: string) => {
    const result = users.filter((user) =>
      (user.firstName + user.lastName + user.email).includes(name)
    );
    setDisplayUsers(result);
  };

  return (
    <div style={{ margin: "0 10px 0" }}>
      <h1 style={{ margin: "10px 0 10px" }}>Search</h1>
      <div
        className="search-bar"
        style={{
          display: "flex",
          alignItems: "center",
          background: "#efefef",
          color: "#bbbbbc",
          borderRadius: "5px",
          padding: "5px",
        }}>
        <SearchIcon style={{ width: "20px" }}></SearchIcon>
        {/* future scope */}
        {/* <Autocomplete
          id="combo-box-demo"
          options={states}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField sx={{border: "none"}} {...params} label="Movie" />}
        /> */}
        <input
          className="search-input"
          placeholder="Search"
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value.length == 0) {
              setDisplayUsers(users);
            }
          }}
          onKeyDown={handleSubmit}
          style={{
            fontSize: "15px",
            marginLeft: "5px",
            width: "100%",
            border: "none",
            background: "#efefef",
            outline: "none",
          }}
        />
      </div>
      <div className="search-data">
        {displayUsers.map((user: any) => (
          <div
            key={user.id}
            style={{ display: "flex", flexDirection: "column" }}>
            <SearchCard
              setFollowingUsers={setFollowingUsers}
              isFollowing={!!followingUsers.find((ele) => ele.id === user.id)}
              id={user.id}
              name={user.firstName}
              username={user.email}
              followers={user.followers.length}></SearchCard>
            <Divider style={{ width: "87%", alignSelf: "flex-end" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
