import React from "react";

const Profile = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      profile
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default Profile;
