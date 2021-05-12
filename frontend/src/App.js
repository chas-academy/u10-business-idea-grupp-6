import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/'
import Styles from './components/styles/'
import Register from './components/register/'

const App = () => {
    return (
        <>
            <main>
                <Router>
                    <Route path="/" exact component={Home} />
                    <Route path="/styles" exact component={Styles} />
                    <Route path="/register" exact component={Register} />

                </Router>
            </main>
        </>
    );
}

export default App;