import { Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './guard/protected_route';
import { useState, useEffect } from 'react';
import Home from './components/home/';
import Register from './components/register/';
import Login from './components/login/';
import Verified from './components/verified/';
import AlreadyVerified from "./components/already_verified/";
import Verify from './components/verify/';
import Preferences from './components/preferences/';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token')); 
  
  const getIsAuth = e => setIsAuth(e);

  return (
    <>
      <main>
        <Router>
          <Route
            path="/"
            exact component={Home}
          />

          <Route
            path="/register"
            render={(props) => (
              <Register { ...props } getToken={getIsAuth} />
            )}
          />

          <Route
            path="/login"
            render={(props) => (
              <Login { ...props } getToken={getIsAuth} />
            )}
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

          <ProtectedRoute
            path="/preferences"
            exact component={Preferences}
            isAuth={isAuth} 
          />

        </Router>
      </main>
    </>
  );
}

export default App;