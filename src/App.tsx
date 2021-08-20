import React from 'react';
import './App.css';
import {Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from "./pages/Home";
import StravaRedirect from "./pages/StravaRedirect";
import Data from "./pages/Data";
import ShowActivity from "./pages/ShowActivity";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/redirect" component={StravaRedirect} />
                <Route path="/data" component={Data} />
                <Route path="/showactivity/:activityId" component={ShowActivity} />t
            </Switch>
        </Router>
    </div>
  );
}

export default App;
