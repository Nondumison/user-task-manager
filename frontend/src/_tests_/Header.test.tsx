import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  it('renders the app title and user info', () => {
    render(<Header />);
    
    expect(screen.getByText('TaskManager')).toBeInTheDocument();
    expect(screen.getByText('Welcome, Admin')).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
  });
});