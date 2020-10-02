import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import ItemPage from './testweb/pages/ItemPage';
import SigninPage from './home/pages/SigninPage';
import SignupPage from './home/pages/SignupPage';
import ShoppingBagPage from "./testweb/pages/ShoppingBagPage";
import AdminPage from "./admin/pages/AdminPage";

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
                <Route exact path="/item/shopping-bag" component={ShoppingBagPage}/>
                <Route exact path="/admin" component={AdminPage}/>
            </Router>
        </div>
    )
}

export default App;
