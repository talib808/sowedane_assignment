import React, { useEffect, useState } from "react";
import "./EmailConfirmation.css";

function EmailConfirmation() {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationStatus, setConfirmationStatus] = useState("");

  useEffect(() => {
    const confirmationEndpoint = "/api/email/confirm";

    fetch(confirmationEndpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setConfirmationStatus("success");
          setConfirmationMessage(data.message);
        } else {
          setConfirmationStatus("error");
          setConfirmationMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching confirmation status:", error);
        setConfirmationStatus("error");
        setConfirmationMessage("Failed to fetch confirmation status");
      });
  }, []);

  return (
    <div className={`email-confirmation ${confirmationStatus}`}>
      <p>{confirmationMessage}</p>
    </div>
  );
}

export default EmailConfirmation;
