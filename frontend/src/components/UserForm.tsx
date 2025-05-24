import React, { useState } from "react";
import { createUser } from "../services/api";

const UserForm: React.FC<{ onUserCreated: () => void }> = ({
  onUserCreated,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      await createUser({ name, email });
      setName("");
      setEmail("");
      setError("");
      onUserCreated();
    } catch (err) {
      setError("Failed to create user");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Add New User</h5>
        {error && <div className="alert alert-danger">{error}</div>}
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
              required
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
              required
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
