import { Route, BrowserRouter as Router } from 'react-router-dom';

// Components
import Home from './components/home/'


function App() {
  return (
      <Router>
            <Route path="/" exact component={Home} />
      </Router>
  );
}

export default App;
