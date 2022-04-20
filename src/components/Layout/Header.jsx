import React from 'react';
import { useUser } from '../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOutUser } from '../../services/users';
import styles from './Layout.css';

export default function Header() {
  // get username from context (or whereever user is stored)
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    setCurrentUser({});
    navigate(`/`, { push: true });
  };

  return (
    <header>
      <NavLink to="/">GeoTone</NavLink>
      {!currentUser.username && <NavLink to="/register">Register</NavLink>}
      {!currentUser.username && <NavLink to="/signin">Sign In</NavLink>}
      {/* // pass user into path as template literals to access the logged in users
      //profile. */}
      {currentUser.username && (
        <div className={styles.loggedIn}>
          <p>Signed In As:</p>
          <NavLink to={`/user/${currentUser.username}`}>
            {currentUser.username}
          </NavLink>
        </div>
      )}
      {currentUser.username && <button onClick={handleLogout}>Log Out</button>}
    </header>
  );
}
