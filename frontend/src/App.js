import { Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Home from './components/home/'
import Styles from './components/styles/'


function App() {
  return (
      <Router>
            <Route path="/" exact component={Home} />
            <Route path="/styles" exact component={Styles} />
      </Router>
  );
}

export default App;
