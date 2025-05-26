import React, { useState, useEffect } from "react";
import { getUsers, getUserTasks, deleteUser } from "../services/api";
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
  const [users, setUsers] = useState<(User & { taskCount?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsersWithTaskCount = async () => {
      try {
        const data = await getUsers();
        const usersWithCounts = await Promise.all(
          (data as User[]).map(async (user: User) => {
            const tasks = await getUserTasks(user.id);
            return { ...user, taskCount: tasks.length };
          })
        );

        setUsers(usersWithCounts);
      } catch (err) {
        setError("Failed to fetch users and tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithTaskCount();
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
    <div className="user-list">
      {users.map((user, idx) => (
        <React.Fragment key={user.id}>
          <div
            onClick={() => onSelectUser(user.id)}
            style={{
              cursor: "pointer",
              padding: "15px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9f9f9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#fff")
            }
          >
            <div>
              <h5 style={{ marginBottom: "5px" }}>{user.name}</h5>
              <p style={{ marginBottom: "5px", color: "#666" }}>{user.email}</p>
              <span className="badge bg-primary">
                {user.taskCount || 0} tasks
              </span>
            </div>
            <span
              onClick={(e) => handleDelete(user.id, e)}
              style={{
                cursor: "pointer",
                color: "red",
                fontWeight: "bold",
                fontSize: "1.3rem",
                userSelect: "none",
                marginLeft: "15px",
              }}
              title="Delete user"
            >
              &times;
            </span>
          </div>

          {idx < users.length - 1 && (
            <hr style={{ borderColor: "#eee", margin: "0 0 15px 0" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserList;
