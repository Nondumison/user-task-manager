import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [refreshUsers, setRefreshUsers] = useState(false);

  const handleUserCreated = () => {
    setRefreshUsers(!refreshUsers);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Task Manager</h1>
      <div className="row">
        <div className="col-md-6">
          <UserForm onUserCreated={handleUserCreated} />
          <UserList onSelectUser={setSelectedUserId} />
        </div>
        <div className="col-md-6">
          {selectedUserId ? (
            <TaskList userId={selectedUserId} />
          ) : (
            <div className="alert alert-info">Select a user to view their tasks</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;