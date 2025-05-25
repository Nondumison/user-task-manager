import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Header', () => () => <div>Header</div>);
jest.mock('./components/WeatherWidget', () => () => <div>WeatherWidget</div>);
jest.mock('./components/UserForm', () => ({ onUserCreated }: any) => (
  <button onClick={onUserCreated}>Create User</button>
));
jest.mock('./components/UserList', () => ({ onSelectUser }: any) => (
  <button onClick={() => onSelectUser(1)}>Select User</button>
));
jest.mock('./components/TaskList', () => ({ onBack }: any) => (
  <button onClick={onBack}>Back</button>
));

describe('App', () => {
  it('shows welcome message initially', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Task Manager')).toBeInTheDocument();
  });

  it('renders all main sections', () => {
    render(<App />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('WeatherWidget')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
  });
});