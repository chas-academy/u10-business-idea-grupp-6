import { Route, BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./guard/protected_route";
import React, { useState, useEffect } from "react";
import Home from "./components/home/";
import Register from "./components/register/";
import Login from "./components/login/";
import Verified from "./components/verified";
import AlreadyVerified from "./components/already_verified";
import Verify from "./components/verify";
import EditProfile from "./components/edit-profile";
import ChangePassword from "./components/change_password";

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  const getIsAuth = (e) => setIsAuth(e);

  return (
    <>
      <main>
        <Router>
          <Route path="/" exact component={Home} />

          <Route
            path="/register"
            render={(props) => <Register {...props} getToken={getIsAuth} />}
          />

          <Route
            path="/login"
            render={(props) => <Login {...props} getToken={getIsAuth} />}
          />

          <ProtectedRoute
            path="/verified"
            exact
            component={Verified}
            isAuth={isAuth}
          />

          <ProtectedRoute
            path="/already-verified"
            exact
            component={AlreadyVerified}
            isAuth={isAuth}
          />

          <ProtectedRoute
            path="/verify"
            exact
            component={Verify}
            isAuth={isAuth}
          />

          <ProtectedRoute
            path="/change-password"
            exact
            component={ChangePassword}
            isAuth={isAuth}
          />

          <Route
            path="/edit-profile"
            exact
            component={EditProfile}
            isAuth={isAuth}
          />
        </Router>
      </main>
    </>
  );
};

export default App;
