import React from "react";

function User({ user, index, handleSelectUser }) {
  const userStyle = {
    fontWeight: user.selected ? "bold" : "normal",
  };

  return (
    <li key={index}>
      <label>
        <input
          type="checkbox"
          checked={user.selected}
          onChange={() => handleSelectUser(index)}
        />
        <span style={userStyle}>
          {user.name.first} {user.name.last}
        </span>{' '}
        - {user.gender}
      </label>
    </li>
  );
}

export default User;
