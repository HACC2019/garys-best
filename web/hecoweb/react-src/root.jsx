import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from 'landing';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class Root extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Landing}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default Root;

render(<Root />, document.getElementById('root'));
