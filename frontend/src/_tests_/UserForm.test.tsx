import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm';

describe('UserForm', () => {
  const mockSubmit = jest.fn();

  it('validates and submits form', async () => {
    render(<UserForm onUserCreated={mockSubmit} />);
    
    
    fireEvent.click(screen.getByText('Create User'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();

    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@test.com' } });
    fireEvent.click(screen.getByText('Create User'));

    expect(mockSubmit).toHaveBeenCalled();
  });
});