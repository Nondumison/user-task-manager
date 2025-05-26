import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm';
import { createUser } from '../services/api';

jest.mock('../services/api', () => ({
  createUser: jest.fn(),
}));

describe('UserForm', () => {
  const mockSubmit = jest.fn();
  const mockedCreateUser = createUser as jest.Mock;

  beforeEach(() => {
    mockedCreateUser.mockResolvedValue({ id: 1, name: 'John', email: 'john@test.com' });
  });

  it('validates and submits form', async () => {
    render(<UserForm onUserCreated={mockSubmit} />);

    fireEvent.click(screen.getByText('Create User'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@test.com' } });
    fireEvent.click(screen.getByText('Create User'));

    expect(await screen.findByText('User created successfully')).toBeInTheDocument();
    expect(mockedCreateUser).toHaveBeenCalledWith({ name: 'John', email: 'john@test.com' });
    expect(mockSubmit).toHaveBeenCalled(); 
  });
});
