import { Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './guard/protected_route';
import { useState, useEffect } from 'react';
import Home from './components/home/';
import Register from './components/register/';
import Login from './components/login/';
import Verified from './components/verified';
import AlreadyVerified from "./components/already_verified";
import Verify from './components/verify';
import Notification from './components/notification';
import Chat from './components/chat';
import { GET } from './shared/services/requests';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));

  const logout = () => {
    GET('logout').then(data => {

      setIsAuth(null);

      localStorage.removeItem('token');
      localStorage.removeItem('user_id');

    window.location.reload();
    }).catch(e => {

      setIsAuth(null);

      localStorage.removeItem('token');
      localStorage.removeItem('user_id');

      window.location.reload();
    })
  }

  const getIsAuth = e => setIsAuth(e);

  return (
    <>
      <main>


        {isAuth && <button className="button-link" onClick={logout}>Log out</button>}
        <Router>
          
          <Notification
            auth={isAuth}
          />

          <Route
            path="/"
            exact component={Home}
          />

          <Route
            path="/register"
            render={(props) => (
              <Register {...props} getToken={getIsAuth} />
            )}
          />

          <Route
            path="/login"
            render={(props) => (
              <Login {...props} getToken={getIsAuth} />
            )}
          />

          <ProtectedRoute
            path="/chat"
            exact component={Chat}
            isAuth={isAuth}
          />

          <ProtectedRoute
            path="/verified"
            exact component={Verified}
            isAuth={isAuth}
          />

          <ProtectedRoute
            path="/already-verified"
            exact component={AlreadyVerified}
            isAuth={isAuth}
          />

          <ProtectedRoute
            path="/verify"
            exact component={Verify}
            isAuth={isAuth}
          />

        </Router>
      </main>
    </>
  );
}

export default App;