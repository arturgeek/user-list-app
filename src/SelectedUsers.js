import React from 'react';

function SelectedUsers({ users }) {
  return (
    <div>
      <h2>Selected Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <span style={{ fontWeight: 'bold' }}>
              {user.name.first} {user.name.last}
            </span>{' '}
            - {user.gender}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectedUsers;