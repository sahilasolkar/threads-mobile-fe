import { AccountCircle } from "@mui/icons-material";
import React from "react";
import { followUser, unfollowUser } from "../services/userService";

interface SearchCardProps {
  setFollowingUsers: any;
  isFollowing: boolean;
  id: string;
  name: string;
  username: string;
  followers: number;
}

const SearchCard: React.FC<SearchCardProps> = ({
  setFollowingUsers,
  isFollowing,
  id,
  name,
  username,
  followers,
}) => {
  const handleFollowUser = () => {
    followUser({ followeeId: id })
      .then((res) => {
        setFollowingUsers((prev: any) => [...prev, { id, firstName: name }]);
      })
      .catch((error) => console.log(error));
  };

  const handleUnfollowUser = () => {
    unfollowUser({ followeeId: id })
      .then((res) => {
        setFollowingUsers((prev: any) => [
          ...prev.filter((user: any) => user.id != id),
        ]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <div
        className="user-meta-data"
        style={{
          display: "flex",
          gap: "0.5rem",
        }}>
        <AccountCircle
          style={{
            height: "30px",
            width: "30px",
            marginTop: "5px",
          }}></AccountCircle>
        <div>
          <p style={{ fontWeight: "500" }}>{name}</p>
          <p style={{ color: "#bbbbbc" }}>{username}</p>
          <p
            style={{
              fontWeight: "500",
              fontSize: "smaller",
              margin: "5px 0 0",
            }}>
            {followers} {followers == 1 ? "follower" : "followers"}
          </p>
        </div>
      </div>
      <div className="follow-button">
        {!isFollowing && (
          <p
            onClick={handleFollowUser}
            style={{
              padding: "3px 15px 3px",
              border: "1px solid #bbbbbc",
              borderRadius: "5px",
              fontWeight: "500",
            }}>
            Follow
          </p>
        )}
        {isFollowing && (
          <p
            onClick={handleUnfollowUser}
            style={{
              padding: "3px 15px 3px",
              border: "1px solid #bbbbbc",
              borderRadius: "5px",
              fontWeight: "500",
            }}>
            Following
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
