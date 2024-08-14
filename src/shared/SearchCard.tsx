import { AccountCircle } from "@mui/icons-material";
import React from "react";

interface SearchCardProps {
  name: string;
  username: string;
  followers: number;
}

const SearchCard: React.FC<SearchCardProps> = ({
  name,
  username,
  followers,
}) => {
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
        <p
          style={{
            padding: "3px 15px 3px",
            border: "1px solid #bbbbbc",
            borderRadius: "5px",
            fontWeight: "500",
          }}>
          Follow
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
