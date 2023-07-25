import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { UserProvider } from './src/context/UserContext';
import { ProjectProvider } from './src/context/ProjectContext';
import Layout from './src/components/Layout/Layout';
import About from './src/views/About/About';
import CreateProfile from './src/views/CreateProfile/CreateProfile';
import EditProfile from './src/views/EditProfile/EditProfile';
import Explore from './src/views/Explore/Explore';
import Home from './src/views/Home/Home';
import Project from './src/views/Project/Project';
import Register from './src/views/Register/Register';
import SignIn from './src/views/SignIn/SignIn';
import Profile from './src/views/Profile/Profile';
import PrivateRoute from './src/components/PrivateRoute/PrivateRoute';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <UserProvider>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/explore" element={<Explore />} />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/user/new"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/user/:username"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/user/:username/edit"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/project/:id"
                element={
                  <ProjectProvider>
                    <PrivateRoute>
                      <Project />
                    </PrivateRoute>
                  </ProjectProvider>
                }
              />
            </Routes>
          </Layout>
        </UserProvider>
      </Router>
    </MotionConfig>
  );
}
