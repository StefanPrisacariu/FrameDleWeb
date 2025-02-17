import * as React from 'react';

import { Route, Router } from 'react-router-dom';

import Main from './Main';
import Info from './Info';
import Endless from './Endless';

const App = () => {
    return (
        <Router>
            <Route exact path="/" element={Main} />
            <Route exact path="/endless" element={Endless} />
            <Route exact path="/info" element={Info} />
        </Router>
    );
};

export default App;
