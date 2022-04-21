import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import Auth from './Auth';

it('should render Auth form component in a registering state', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Auth isRegistering />
      </UserProvider>
    </MemoryRouter>
  );

  screen.getByRole('heading', { name: /register/i });
});

it('should render Auth component in a Logging In state', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Auth />
      </UserProvider>
    </MemoryRouter>
  );

  screen.getByRole('heading', { name: /log in/i });
});
