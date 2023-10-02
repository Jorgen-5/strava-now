import React from 'react';
import {Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from "./pages/Home";
import StravaRedirect from "./pages/StravaRedirect";
import Data from "./pages/Data";
import ShowActivity from "./pages/ShowActivity";

import './App.scss';


function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/redirect" component={StravaRedirect} />
                <Route path="/data" component={Data} />
                <Route path="/showactivity/:activityId" component={ShowActivity} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
