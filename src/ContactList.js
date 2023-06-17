import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=12');
        setUsers(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleShowAge = (id) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.login.uuid === id) {
          return {
            ...user,
            showAge: !user.showAge,
          };
        }
        return user;
      });
    });
  };

  return (
    <div>
      <h1>Contact List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {users.map((user) => (
          <div
            key={user.login.uuid}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: '350px',
            }}
          >
            <h3>{`${user.name.first} ${user.name.last}`}</h3>
            <p>Email: {user.email}</p>
            {user.showAge ? <p>Age: {user.dob.age}</p> : null}
            <button
              onClick={() => handleShowAge(user.login.uuid)}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              {user.showAge ? 'Hide Age' : 'Show Age'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList; 
