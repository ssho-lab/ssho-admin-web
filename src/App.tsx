import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import ItemPage from './pages/ItemPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import ItemLikePage from "./pages/ItemLikePage";

interface AppProps {

}

const App: React.FC<AppProps> = () => {
    React.useEffect(() => {
        document.title = "스쇼"
    }, [])
    return (
        <div>
            <Router>
                <Route exact path="/" component={SigninPage}></Route>
                <Route exact path="/signup" component={SignupPage}></Route>
                <Route exact path="/item" component={ItemPage}></Route>
                <Route exact path="/item/like" component={ItemLikePage}></Route>
            </Router>
        </div>
    )
}

export default App;
