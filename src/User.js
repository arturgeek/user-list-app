import React from 'react';

function User({ user, index, handleSelectUser }) {
  return (
    <li key={index}>
      <label>
        <input
          type="checkbox"
          checked={user.selected}
          onChange={() => handleSelectUser(index)}
        />
        {user.name.first} {user.name.last} - {user.gender}
      </label>
    </li>
  );
}

export default User;