import React from "react";
const User = ({ user }) => {
  const { avatar_url, login, html_url } = user;
  return (
    <div className="user">
      <div className="image">
        <img src={avatar_url} alt={login} />
      </div>
      <div className="user-info">
        <h3>{login}</h3>
        <a href={html_url} target="_blank"> Profile: {html_url}</a>
      </div>
    </div>
  );
};

export default User;
