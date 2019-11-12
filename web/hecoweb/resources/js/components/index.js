import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import overall from './overall';

// ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
ReactDOM.render(<Dashboard />, document.getElementById('root'));
