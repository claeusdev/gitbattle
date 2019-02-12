import React, { Component } from 'react';
import Popular from './Popular';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <Switch>
            <Route path="/popular" exact component={Popular} />
            <Route path="/battle/results" component={Results} />

            <Route path="/battle" exact component={Battle} />
            <Route path="/" exact component={Home} />
            <Route
              render={() => {
                return <p>404, You're not looking well</p>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
