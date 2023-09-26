import React, { useState } from 'react';
import './TwoFactorAuth.css'; // Import the CSS file for styling

function TwoFactorAuth() {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API request to verify the 2FA code
      const response = await fetch('/api/verify-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode }),
      });

      if (response.ok) {
        // Verification successful
        setVerificationStatus('success');
      } else {
        // Verification failed, handle errors
        const data = await response.json();
        setVerificationStatus('error');
        console.error('Verification error:', data.message);
      }
    } catch (error) {
      // Network or server error
      setVerificationStatus('error');
      console.error('Network error:', error);
    }
  };

  return (
    <div className="two-factor-auth-container">
      <form className="two-factor-auth-form" onSubmit={handleSubmit}>
        <h2>Two-Factor Authentication</h2>
        <div className="form-group">
          <label htmlFor="verificationCode">Enter Verification Code</label>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Verify</button>
      </form>
      {verificationStatus === 'success' && (
        <div className="verification-success">
          Verification successful! You can now access your account.
        </div>
      )}
      {verificationStatus === 'error' && (
        <div className="verification-error">
          Verification failed. Please check your code and try again.
        </div>
      )}
    </div>
  );
}

export default TwoFactorAuth;
