import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Question_1 from "./components/Question_1";
import Question_2 from "./components/Question_2";
// eslint-disable-next-line
{/* import Question_3 from "./components/Question_3"; */}
// eslint-disable-next-line
{/* import Question_4 from "./components/Question_4"; */}
// eslint-disable-next-line
{/* import Question_5 from "./components/Question_5"; */}
// eslint-disable-next-line
{/* import Question_6 from "./components/Question_6"; */}

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/" component={Question_1} exact/>
              <Route path="/feedback2" component={Question_2}/>
              {/* <Route path="/feedback3" component={Question_3}/> */}
              {/* <Route path="/feedback4" component={Question_4}/> */}
              {/* <Route path="/feedback5" component={Question_5}/> */}
              {/* <Route path="/feedback6" component={Question_6}/> */}
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
