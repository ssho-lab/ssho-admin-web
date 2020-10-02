import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import ItemPage from './testweb/pages/ItemPage';
import SigninPage from './testweb/pages/SigninPage';
import SignupPage from './testweb/pages/SignupPage';
import ItemLikePage from "./testweb/pages/ItemLikePage";

interface AppProps {}

const App: React.FC<AppProps> = () => {

    React.useEffect(() => {
        document.title = "스쇼"
    }, [])

    return (
        <div>
            <Router>
                <Route exact path="/" component={SigninPage}/>
                <Route exact path="/signup" component={SignupPage}/>
                <Route exact path="/item" component={ItemPage}/>
                <Route exact path="/item/like" component={ItemLikePage}/>
            </Router>
        </div>
    )
}

export default App;
