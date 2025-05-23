import React, { useState, useEffect } from "react";
import { getUsers } from "../services/api";
import { User } from "../types";

const UserList: React.FC<{ onSelectUser: (userId: number) => void }> = ({
  onSelectUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="list-group">
      {users.map((user) => (
        <button
          key={user.id}
          className="list-group-item list-group-item-action"
          onClick={() => onSelectUser(user.id)}
        >
          {user.name} - {user.email}
        </button>
      ))}
    </div>
  );
};

export default UserList;
