import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockUser, mockProfile } from '../../mocks/resolvers';
import { UserProvider } from '../../context/UserContext';
import Profile from './Profile';
import CreateProfile from '../CreateProfile/CreateProfile';
import EditProfile from '../EditProfile/EditProfile';

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
  ),

  rest.patch(
    `${process.env.API_URL}/api/v1/profiles/:username`,
    (req, res, ctx) => {
      req.body = { bio: 'edited', avatar: 'edited' };
      return res(ctx.json({ ...mockProfile, ...req.body }));
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

  it('should render an empty profile page and allow the user to create then edit their profile', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={[
          `/user/${mockUser.username}/edit`,
          '/user/new',
          `/user/${mockUser.username}`,
        ]}
      >
        <UserProvider>
          <Routes>
            <Route path="user">
              <Route path=":username" element={<Profile />} />
              <Route path="new" element={<CreateProfile />} />
              <Route path=":username/edit" element={<EditProfile />} />
            </Route>
          </Routes>
        </UserProvider>
      </MemoryRouter>
    );

    let redirectButton = await screen.findByRole('button', {
      name: /click here/i,
    });

    await user.click(redirectButton);

    // CREATE PROFILE - Redirect to /user/new
    //
    // If navigated to /user/new, should display the following:

    let bioInput = await screen.findByRole('textbox', { name: /bio/i });
    let avatarInput = await screen.findByRole('textbox', { name: /avatar/i });

    redirectButton = await screen.findByRole('button', {
      name: /create/i,
    });

    await user.type(bioInput, 'mock bio');
    await user.type(avatarInput, 'mock image url');
    screen.debug();

    await user.click(redirectButton);

    // PROFILE - Redirect to /user/:username
    //
    // On redirect to user profile, response carries new user profile data

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

    redirectButton = await screen.findByRole('button', {
      name: /edit profile/i,
    });

    await user.click(redirectButton);

    // EDIT PROFILE - Redirect to /user/:username/edit
    //
    // On redirect, should allow the user to edit bio and avatar

    bioInput = await screen.findByRole('textbox', { name: /bio/i });
    avatarInput = await screen.findByRole('textbox', { name: /avatar/i });

    redirectButton = await screen.findByRole('button', {
      name: /edit/i,
    });

    await user.type(bioInput, 'edited bio');
    await user.type(avatarInput, 'edited image url');

    expect(bioInput).toHaveValue('edited bio');

    await user.click(redirectButton);

    server.use(
      rest.get(
        `${process.env.API_URL}/api/v1/profiles/:username`,
        (req, res, ctx) => {
          return res(
            ctx.json({
              ...mockProfile,
              bio: 'edited bio',
              avatar: 'edited image url',
            })
          );
        }
      )
    );

    await screen.findByRole('heading', { name: /mockuser/i });
    await screen.findByText('edited bio');
  });
});
