import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import TaskList from "./components/TaskList";
import WeatherWidget from "./components/WeatherWidget";
import Header from "./components/Header";

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [refreshUsers, setRefreshUsers] = useState(false);

  const handleUserCreated = () => {
    setRefreshUsers((prev) => !prev);
  };

  const handleUserDeleted = () => {
    setRefreshUsers((prev) => !prev);
    setSelectedUserId(null);
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="app-container">
      <Header />

      <div className="container-fluid main-content">
        <div className="row">
          <div className="col-md-3 sidebar">
            <div className="sidebar-content p-3">
              <WeatherWidget />
              <div className="mt-4">
                <UserForm onUserCreated={handleUserCreated} />
              </div>
              <div className="mt-4">
                <h5>Team Members</h5>
                <UserList
                  onSelectUser={setSelectedUserId}
                  refresh={refreshUsers}
                  onUserDeleted={handleUserDeleted}
                />
              </div>
            </div>
          </div>

          <div className="col-md-9 main-board" style={{backgroundColor:"#d9c39e"}}>
            {selectedUserId ? (
              <TaskList userId={selectedUserId} onBack={handleBack} />
            ) : (
              <div className="welcome-message">
                <h2>Welcome to Task Manager</h2>
                <p>
                  Select a team member to view their tasks or create a new one
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
