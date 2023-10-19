import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';
import SelectedUsers from './SelectedUsers'; // Import the SelectedUsers component


function App() {
  const [users, setUsers] = useState([]);
  const [showSelectedUsers, setShowSelectedUsers] = useState(false); // State for displaying selected users
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
    const pageOffset = usersPerPage * (currentPage-1);
    const updatedUsers = [...users];
    const currentPageIndexUser = pageOffset + index;
    updatedUsers[currentPageIndexUser].selected = !updatedUsers[currentPageIndexUser].selected;
    setUsers(updatedUsers);
  };

  // Calculate the current users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="App">
      <h1>User List</h1>
      <button onClick={() => setShowSelectedUsers(!showSelectedUsers)}>
        Show Selected Users
      </button>
      {showSelectedUsers ? (
        <SelectedUsers users={users.filter((user) => user.selected)} />
      ) : (
        <ul>
          {currentUsers.map((user, index) => (
            <User
              key={index}
              user={user}
              index={index}
              handleSelectUser={handleSelectUser}
            />
          ))}
        </ul>
      )}
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