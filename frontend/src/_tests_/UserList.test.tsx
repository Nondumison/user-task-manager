import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserList from "../components/UserList";
import { getUsers, deleteUser, getUserTasks } from "../services/api";

jest.mock("../services/api", () => ({
  getUsers: jest.fn(),
  deleteUser: jest.fn(),
  getUserTasks: jest.fn(),
}));

describe("UserList", () => {
  const mockedGetUsers = getUsers as jest.Mock;
  const mockedDeleteUser = deleteUser as jest.Mock;
  const mockedGetUserTasks = getUserTasks as jest.Mock;

  beforeEach(() => {
    mockedGetUsers.mockResolvedValue([
      { id: 1, name: "John", email: "john@test.com" },
      { id: 2, name: "Jane", email: "jane@test.com" },
    ]);
    mockedGetUserTasks.mockResolvedValue([
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ]);
    mockedDeleteUser.mockResolvedValue({});
  });

  it("renders users and handles selection/deletion", async () => {
    const mockSelect = jest.fn();
    const mockDelete = jest.fn();

    jest.spyOn(window, "confirm").mockImplementation(() => true);

    render(
      <UserList
        onSelectUser={mockSelect}
        onUserDeleted={mockDelete}
        refresh={false}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("John"));
    expect(mockSelect).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getAllByTitle("Delete user")[0]);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
