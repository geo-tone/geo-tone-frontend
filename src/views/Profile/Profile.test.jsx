import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserProvider } from '../../context/UserContext';
import Profile from './Profile';
import CreateProfile from '../CreateProfile/CreateProfile';

const mockUser = {
  userId: '0',
  username: 'mockuser',
};

const server = setupServer(
  rest.get(`${process.env.API_URL}/api/v1/users/me`, (req, res, ctx) => {
    return res(ctx.json({ username: 'mockuser', userId: '1' }));
  }),

  rest.get(
    `${process.env.API_URL}/api/v1/profiles/${mockUser.username}`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'this user has no profile' }));
    }
  )
);

describe('Profile', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should be a test', async () => {
    render(
      <MemoryRouter initialEntries={['/user/new', '/user/mockuser']}>
        <UserProvider>
          <Routes>
            <Route path="user/:username" element={<Profile />} />
            <Route path="user/new" element={<CreateProfile />} />
          </Routes>
        </UserProvider>
      </MemoryRouter>
    );

    const createProfileButton = await screen.findByRole(
      'button',
      /create profile/i
    );
  });
});
