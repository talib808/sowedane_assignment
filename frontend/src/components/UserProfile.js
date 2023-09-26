import React, { useState } from 'react';
import './UserProfile.css'; 

function UserProfile({ user }) {

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      username: user.username,
      email: user.email,
    });
    setIsSuccessful(false);
    setFeedbackMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simulate a server request (replace with actual API call)
  const simulateServerRequest = async (data) => {
    // Simulate a delay to mimic a real server request
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      // You can add validation logic here (e.g., password matching)

      // Simulate a successful update
      await delay(1000); // Simulate a 1-second delay
      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      // Simulate an error from the server
      throw new Error('Failed to update profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await simulateServerRequest(formData);
      if (result.success) {
        setIsEditing(false);
        setIsSuccessful(true);
        setFeedbackMessage(result.message);
      } else {
        setIsSuccessful(false);
        setFeedbackMessage('Failed to update profile');
      }
    } catch (error) {
      setIsSuccessful(false);
      setFeedbackMessage('Failed to update profile');
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Add more profile fields here if needed */}
          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
      {isSuccessful && <p className="success-message">{feedbackMessage}</p>}
      {!isSuccessful && feedbackMessage && (
        <p className="error-message">{feedbackMessage}</p>
      )}
    </div>
  );
}

export default UserProfile;
