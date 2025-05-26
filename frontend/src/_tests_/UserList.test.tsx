
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList';
import { getUsers, deleteUser } from '../services/api';

jest.mock('../services/api', () => ({
  getUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

describe('UserList', () => {
  const mockedGetUsers = getUsers as jest.Mock;
  const mockedDeleteUser = deleteUser as jest.Mock;

  beforeEach(() => {
    mockedGetUsers.mockResolvedValue([
      { id: 1, name: 'John', email: 'john@test.com' },
      { id: 2, name: 'Jane', email: 'jane@test.com' },
    ]);

    mockedDeleteUser.mockResolvedValue({});
  });

  it('renders users and handles selection/deletion', async () => {
    const mockSelect = jest.fn();
    const mockDelete = jest.fn();
  
    // ✅ Simulate user clicking "OK" on confirm dialog
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
  
    render(
      <UserList
        onSelectUser={mockSelect}
        onUserDeleted={mockDelete}
        refresh={false}
      />
    );
  
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText('John'));
    expect(mockSelect).toHaveBeenCalledWith(1);
  
    fireEvent.click(screen.getAllByText('x')[0]);
    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalled();
    });
  });
  
});
