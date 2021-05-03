import { Route, BrowserRouter as Router } from 'react-router-dom';

// Public
import Home from './public/components/home'

// Secure

function App() {
  return (
      <Router>
            <Route path="/" exact component={Home} />
      </Router>
  );
}

export default App;
