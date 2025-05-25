import React from "react";

const Header: React.FC = () => {
  return (
    <header
      className="app-header text-white p-3 shadow"
      style={{ backgroundColor: "#e0823a" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="m-0">
            <i className="bi bi-kanban-fill me-2"></i>
            TaskManager
          </h6>
          <div className="d-flex align-items-center">
            <span className="me-3">Welcome, Admin</span>
            <div
              className="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center" data-testid="user-avatar"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="bi bi-person-fill"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
