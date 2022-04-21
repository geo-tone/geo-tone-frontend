import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockUser, mockProfile } from '../../mocks/resolvers';
import { UserProvider } from '../../context/UserContext';
import Profile from './Profile';
import CreateProfile from '../CreateProfile/CreateProfile';

const server = setupServer(
  rest.get(`${process.env.API_URL}/api/v1/users/me`, (req, res, ctx) => {
    return res(ctx.json(mockUser));
  }),

  rest.get(
    `${process.env.API_URL}/api/v1/profiles/:username`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'this user has no profile' }));
    }
  ),

  rest.post(`${process.env.API_URL}/api/v1/profiles`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),

  rest.get(
    `${process.env.API_URL}/api/v1/projects/user/:user_id`,
    (req, res, ctx) => {
      return res(ctx.json({ message: 'this user has no projects' }));
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

    // REDIRECT:
    //    If navigated to /user/new, should display the following:
    const bioInput = await screen.findByRole('textbox', { name: /bio/i });
    const avatarInput = await screen.findByRole('textbox', { name: /avatar/i });
    const saveProfileButton = await screen.findByRole('button', {
      name: /create/i,
    });

    await user.type(bioInput, 'mock bio');
    await user.type(avatarInput, 'mock image url');

    await user.click(saveProfileButton);

    // REDIRECT:
    //    On redirect to user profile, response carries new user profile data
    server.use(
      rest.get(
        `${process.env.API_URL}/api/v1/profiles/:username`,
        (req, res, ctx) => {
          return res(ctx.json(mockProfile));
        }
      )
    );

    await screen.findByRole('heading', { name: /mockuser/i });
    await screen.findByAltText(/user avatar/i);

    screen.debug();
  });
});
