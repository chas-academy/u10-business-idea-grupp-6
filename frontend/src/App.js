import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './components/home/';
import Menu from './components/menu/';
import Register from './components/register/';
import Login from './components/login/';
import Verified from './components/verified';
import AlreadyVerified from './components/already_verified';
import EditProfile from './components/edit-profile';
import ChangePassword from './components/change_password';
import Verify from './components/verify';
import Notification from './components/notification';
import Chat from './components/chat';
import Preferences from './components/preferences/';
import Match from './components/match';
import Profile from './components/profile/';
import { GET } from './shared/services/requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import YourProfile from './components/your_profile';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token')),
        [authLoading, setAuthLoading] = useState(false);

  const logout = () => {
    setAuthLoading(true);
    GET('logout')
      .then(data => {
        setAuthLoading(false);
        setIsAuth(null);

        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        window.location.reload();
      })
      .catch(e => {
        setAuthLoading(false);
        setIsAuth(null);

        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('timezone_offset');

        window.location.reload();
      });
  };

  useEffect(() => {
    if (isAuth && (
      !window.location.pathname.includes('verify') &&
      !window.location.pathname.includes('register'))
    ) {
      setAuthLoading(true);
      GET('verify-auth')
        .then((data) => {
          setAuthLoading(false);

          if (data.status !== 200)
            logout();
        }).catch((error) => logout());
    }
  }, [isAuth])

  const getIsAuth = e => setIsAuth(e),
        getAuthLoading = e => setAuthLoading(e);

  return (
    <>
      {authLoading &&
        <span className="spinner-overlay shown">
          <FontAwesomeIcon
            icon={faSpinner}
            className="spinner shown large"
          />
        </span>
      }

      <Router>
        <main id="main">

          <Notification
            auth={isAuth}
          />

          {!isAuth && <>
            <Switch>
              <Route
                path="/"
                exact
                component={Home}
              />

              <Route
                path="/register"
                render={(props) => (
                  <Register
                    {...props}
                    getToken={getIsAuth}
                    getAuthLoading={getAuthLoading}
                  />
                )}
              />

              <Route
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    getToken={getIsAuth}
                    getAuthLoading={getAuthLoading}
                  />
                )}
              />
              
              <Route
                component={Home}
              />
            </Switch>

          </>}

          {isAuth && <>
            <Switch>
              <Route
                path="/"
                exact
                component={Match}
              />

              <Route
                path="/chat"
                exact
                component={Chat}
              />

              <Route
                path="/preferences"
                exact
                render={(props) => (
                  <Preferences
                    {...props}
                    logoutHandler={logout}
                  />
                )}
                
              />

              <Route
                path="/change-password"
                exact
                render={(props) => (
                  <ChangePassword
                    {...props}
                    logoutHandler={logout}
                  />
                )}
              />

              <Route
                path="/profile"
                exact
                component={Profile}
              />

              <Route
                path="/edit-profile"
                exact
                render={(props) => (
                  <EditProfile
                    {...props}
                    logoutHandler={logout}
                  />
                )}
              />

              <Route
                path="/your-profile"
                exact
                render={(props) => (
                  <YourProfile
                    {...props}
                    logoutHandler={logout}
                  />
                )}
              />

              <Route
                path="/verified"
                exact
                component={Verified}
              />

              <Route
                path="/already-verified"
                exact
                component={AlreadyVerified}
              />

              <Route
                path="/verify"
                exact
                component={Verify}
              />

              <Route
                component={Match}
              />
            </Switch>
          </>
          }
          <nav>
            {isAuth && <Menu />}
          </nav>
        </main>
      </Router>
    </>
  );
};

export default App;
