import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/'
import Register from './components/register/'
import Login from './components/login/'
import VerifiedSuccesfully from './components/verified_succesfully';
import VerifiedAlready from './components/verified_already';

const App = () => {
    return (
      <>
        <main>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/verified_succesfully" exact component={VerifiedSuccesfully} />
            <Route path="/verified_already" exact component={VerifiedAlready} />
            <Route path="/verify" exact component={Verify} />
          </Router>
        </main>
      </>
    );
}

export default App;