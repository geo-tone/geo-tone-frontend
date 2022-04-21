import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Register from './Register';
import { UserProvider } from '../../context/UserContext';

const server = setupServer(
  rest.post(`${process.env.API_URL}/api/v1/users`, (req, res, ctx) => {
    return res(ctx.json({ username: 'mockuser', userId: '1' }));
  }),
  rest.post(`${process.env.API_URL}/api/v1/users/sessions`, (req, res, ctx) => {
    return res(ctx.json({ message: 'Successfully signed in!' }));
  }),
  rest.get(`${process.env.API_URL}/api/v1/users/me`, (req, res, ctx) => {
    return res(ctx.json({ username: 'mockuser', userId: '1' }));
  })
);

describe('Register', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should register and sign up the user.', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Register />
        </UserProvider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByRole('textbox', {
      name: /username:/i,
    });
    const passwordInput = screen.getByLabelText(/password:/i);

    await userEvent.type(usernameInput, 'mockuser');
    await userEvent.type(passwordInput, 'mockpassword');
    const registerButton = screen.getByRole('button', {
      name: /register/i,
    });
    await userEvent.click(registerButton);
    await screen.findByText(
      /You have successfully registered! Logging you in.../i
    );
  });
});
