import React, { useState } from "react";
import { createUser } from "../services/api";

const UserForm: React.FC<{ onUserCreated: () => void }> = ({
  onUserCreated,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      clearErrorAfterTimeout();
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      clearErrorAfterTimeout();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      clearErrorAfterTimeout();
      return;
    }

    try {
      await createUser({ name, email });
      setName("");
      setEmail("");
      setError("");
      setSuccess(true);
      onUserCreated();
      clearSuccessAfterTimeout();
    } catch (err) {
      setError("Failed to create user");
      clearErrorAfterTimeout();
    }
  };

  const clearErrorAfterTimeout = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  const clearSuccessAfterTimeout = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="card mb-4" style={{ backgroundColor: "#f2e3c9" }}>
      <div className="card-body">
        <h5 className="card-title">Add New User</h5>
        {success && (
          <div style={{ color: "green", marginBottom: "1rem" }}>
            User created successfully
          </div>
        )}
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
