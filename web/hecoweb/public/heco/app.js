import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';

ReactDOM.render(<Dashboard />, document.getElementById('root'));
