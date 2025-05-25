import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../services/api";
import { User } from "../types";

interface UserListProps {
  onSelectUser: (userId: number) => void;
  refresh: boolean;
  onUserDeleted: () => void;
}

const UserList: React.FC<UserListProps> = ({
  onSelectUser,
  refresh,
  onUserDeleted,
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
  }, [refresh]);

  const handleDelete = async (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        onUserDeleted();
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  if (loading) return <div className="text-center">Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="column">
      {users.map((user) => (
        <div key={user.id} className="col-md-6 mb-3">
          <div onClick={() => onSelectUser(user.id)}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5>{user.name}</h5>
                {/* <p className="text-muted mb-1">{user.email}</p> */}
                <span className="badge bg-primary">
                  {/* {user.tasks?.length || 0} tasks */}
                </span>
              </div>
              <span
                onClick={(e) => handleDelete(user.id, e)}
                style={{
                  cursor: "pointer",
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: "0.1rem",
                }}
              >
                x
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
