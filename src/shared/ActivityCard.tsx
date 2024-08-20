import { AccountCircle } from "@mui/icons-material";
import { create } from "domain";
import React from "react";

interface ActivityCardProps {
  isLikeNotification: boolean;
  isCommentNotification: boolean;
  content: string;
  username: string;
  createdAt: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  isLikeNotification = false,
  isCommentNotification = false,
  content,
  username,
  createdAt,
}) => {
  // const formattedDate = new Date(Number(createdAt)).toLocaleTimeString();

  return (
    <div style={{ display: "flex", gap: "10px", padding: "10px 0" }}>
      <AccountCircle style={{ height: "30px", width: "30px" }} />
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <p style={{ fontSize: "14px" }}>
            {username} {isCommentNotification && "commented on your post"}
            {isLikeNotification && "liked your post"}
          </p>
          <p style={{ fontSize: "12px" }}>{createdAt}</p>
        </div>
        <p style={{ color: "#7d7d7d" }}>
          {content.length > 25 ? content.slice(0, 25) + "..." : content}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
