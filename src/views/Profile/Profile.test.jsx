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

const mockProfile = {
  ...mockUser,
  bio: 'mock bio',
  avatar: 'mock url',
};

const server = setupServer(
  rest.get(`${process.env.API_URL}/api/v1/users/me`, (req, res, ctx) => {
    return res(ctx.json(mockUser));
  }),

  rest.get(
    `${process.env.API_URL}/api/v1/profiles/${mockUser.username}`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'this user has no profile' }));
    }
  ),

  rest.post(`${process.env.API_URL}/api/v1/profiles`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  })
);

describe('Profile', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render an empty profile page and route to create profile on button click', async () => {
    const user = userEvent.setup();

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

    const createProfileButton = await screen.findByRole('button', {
      name: /click here/i,
    });

    await user.click(createProfileButton);

    // If navigated to /user/new, should display:
    await screen.findByRole('textbox', { name: /bio/i });
    await screen.findByRole('textbox', { name: /avatar/i });
    await screen.findByRole('button', {
      name: /create/i,
    });
  });
});
