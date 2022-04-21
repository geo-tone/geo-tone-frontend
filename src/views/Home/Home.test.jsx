import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

it('should display link to sign up,and the App name. ', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  screen.getByRole('heading', {
    name: /welcome to geo tone\./i,
  });

  screen.getByRole('link', {
    name: /sign up/i,
  });
});
