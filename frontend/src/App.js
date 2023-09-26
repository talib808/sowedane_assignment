import React from "react";
import "./App.css";

import UserProfile from "../../frontend/src/components/UserProfile";
import LoginForm from "../../frontend/src/components/LoginForm";
import TwoFactorAuth from "../../frontend/src/components/TwoFactorAuth";
import RegistrationForm from "../../frontend/src/components/RegistrationForm";
import EmailConfirmation from "../../frontend/src/components/EmailConfirmation";
import Dashboard from "../../frontend/src/components/Dashboard";

function App() {
  const user = {
    username: "mdtalib",
    email: "mdtalib@gamil.com",
  };

  return (
    <div className="App">
      <div className="container">
        <h1>My App</h1>
        <UserProfile user={user} />
        <LoginForm />
        <TwoFactorAuth />
        <RegistrationForm />
        <EmailConfirmation />
        <Dashboard user={user} />
      </div>
    </div>
  );
}

export default App;
