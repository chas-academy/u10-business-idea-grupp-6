import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/'
import Register from './components/register/'
import Login from './components/login/'

const App = () => {
    return (
        <>
            <main>
                <Router>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                </Router>
            </main>
        </>
    );
}

export default App;