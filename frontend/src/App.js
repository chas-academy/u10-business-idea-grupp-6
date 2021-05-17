import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/'
import Register from './components/register/'
import Login from './components/login/'
import Verified from './components/verified';
import AlreadyVerified from "./components/already_verified";
import Verify from './components/verify';

const App = () => {
    return (
      <>
        <main>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/verified" exact component={Verified} />
            <Route path="/already-verified" exact component={AlreadyVerified} />
            <Route path="/verify" exact component={Verify} />
          </Router>
        </main>
      </>
    );
}

export default App;