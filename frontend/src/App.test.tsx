import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('./components/WeatherWidget', () => () => <div data-testid="weather-widget">WeatherWidget</div>);
jest.mock('./components/UserForm', () => ({ onUserCreated }: { onUserCreated: () => void }) => (
  <div>
    <button data-testid="create-user-button" onClick={onUserCreated}>Create User</button>
  </div>
));
jest.mock('./components/UserList', () => ({ 
  onSelectUser, 
  refresh, 
  onUserDeleted 
}: { 
  onSelectUser: (id: number) => void, 
  refresh: boolean, 
  onUserDeleted: () => void 
}) => (
  <div>
    <button data-testid="select-user-button" onClick={() => onSelectUser(1)}>Select User</button>
    <button data-testid="delete-user-button" onClick={onUserDeleted}>Delete User</button>
    <div data-testid="refresh-indicator">{refresh.toString()}</div>
  </div>
));
jest.mock('./components/TaskList', () => ({ userId, onBack }: { userId: number, onBack: () => void }) => (
  <div>
    <div data-testid="task-list-user-id">{userId}</div>
    <button data-testid="back-button" onClick={onBack}>Back</button>
  </div>
));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial layout correctly', () => {
    render(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('weather-widget')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Welcome to TaskFlow')).toBeInTheDocument();
    expect(screen.getByText('Select a team member to view their tasks or create a new one')).toBeInTheDocument();
  });

  it('handles user creation and refreshes user list', () => {
    render(<App />);
    
    const createButton = screen.getByTestId('create-user-button');
    const refreshIndicator = screen.getByTestId('refresh-indicator');
    expect(refreshIndicator).toHaveTextContent('false');
    
    fireEvent.click(createButton);
    
    expect(refreshIndicator).toHaveTextContent('true');
  });

  it('handles user selection and displays TaskList', () => {
    render(<App />);
    
    const selectButton = screen.getByTestId('select-user-button');
    fireEvent.click(selectButton);
    
    expect(screen.getByTestId('task-list-user-id')).toHaveTextContent('1');
    expect(screen.queryByText('Welcome to TaskFlow')).not.toBeInTheDocument();
  });

  it('handles back button from TaskList', () => {
    render(<App />);
    
    const selectButton = screen.getByTestId('select-user-button');
    fireEvent.click(selectButton);
  
    expect(screen.getByTestId('task-list-user-id')).toBeInTheDocument();
    
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    
    expect(screen.getByText('Welcome to TaskFlow')).toBeInTheDocument();
  });

  it('handles user deletion and resets state', () => {
    render(<App />);
    
    const selectButton = screen.getByTestId('select-user-button');
    fireEvent.click(selectButton);
    
    expect(screen.getByTestId('task-list-user-id')).toBeInTheDocument();
  
    const deleteButton = screen.getByTestId('delete-user-button');
    fireEvent.click(deleteButton);
    
    expect(screen.getByText('Welcome to TaskFlow')).toBeInTheDocument();
    expect(screen.getByTestId('refresh-indicator')).toHaveTextContent('true');
  });

  it('toggles refresh state correctly', () => {
    render(<App />);
    const refreshIndicator = screen.getByTestId('refresh-indicator');
    expect(refreshIndicator).toHaveTextContent('false');
    fireEvent.click(screen.getByTestId('create-user-button'));
    expect(refreshIndicator).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('create-user-button'));
    expect(refreshIndicator).toHaveTextContent('false');
  });
});
