import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=50')
      .then((response) => {
        const usersData = response.data.results.map((user) => ({
          ...user,
          selected: false,
        }));
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].selected = !updatedUsers[index].selected;
    setUsers(updatedUsers);
  };

  // Calculate the current users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {currentUsers.map((user, index) => (
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
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
          (item, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;