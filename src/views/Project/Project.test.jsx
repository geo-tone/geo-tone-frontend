import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import { ProjectProvider } from '../../context/ProjectContext';
import Project from './Project';

const mockProject = {
  userId: '1',
  title: 'untitled',
  bpm: 120,
  volume: -12,
  channels: [
    {
      id: 0,
      type: 'synth',
      osc: 'sine',
      steps: [null, null, null, null, null, null, null, null],
      volume: -5,
      reverb: 0.5,
    },
  ],
  projectId: '1',
};
const server = setupServer(
  rest.post(`${process.env.API_URL}/api/v1/projects`, (req, res, ctx) => {
    return res(ctx.json(mockProject));
  }),
  rest.post(
    `${process.env.API_URL}/api/v1/projects/:project_id`,
    (req, res, ctx) => {
      return res(ctx.json(mockProject));
    }
  )
);

describe('Project', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render an empty project', async () => {
    render(
      <MemoryRouter initialEntries={['/project/1']}>
        <UserProvider>
          <ProjectProvider>
            <Routes>
              <Route
                path="project/:id"
                element={<Project isLoggedIn={true} />}
              />
            </Routes>
          </ProjectProvider>
        </UserProvider>
      </MemoryRouter>
    );
    // await screen.findByText(/project volume/i);
    screen.debug();
  });
});
