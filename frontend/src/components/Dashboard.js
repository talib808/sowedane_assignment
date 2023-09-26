import React from 'react';
import './Dashboard.css';

function Dashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      {/* Add more dashboard content here */}
    </div>
  );
}

export default Dashboard;
