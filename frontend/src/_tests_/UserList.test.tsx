import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList';

describe('UserList', () => {
  const users = [
    { id: 1, name: 'John', email: 'john@test.com' },
    { id: 2, name: 'Jane', email: 'jane@test.com' }
  ];

  it('renders users and handles selection/deletion', () => {
    const mockSelect = jest.fn();
    const mockDelete = jest.fn();
    
    render(<UserList users={users} onSelectUser={mockSelect} onUserDeleted={mockDelete} refresh={false} />);

    
    expect(screen.getByText('John')).toBeInTheDocument();
    
    
    fireEvent.click(screen.getByText('John'));
    expect(mockSelect).toHaveBeenCalledWith(1);
    
    
    fireEvent.click(screen.getByText('x'));
    expect(mockDelete).toHaveBeenCalled();
  });
});