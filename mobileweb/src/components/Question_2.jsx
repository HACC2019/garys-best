import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Question_2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer2: ""
    };
    this.onRadioChange = this.onRadioChange.bind(this)
  }

  onRadioChange(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
        <div className="center-bg">
          <h3>Were you able to pay? </h3>
          <input type="radio"
                 name="answer2"
                 value="yes"
                 checked={this.state.answer2 === "yes"}
                 onChange={this.onRadioChange}/> Yes
          <br/>
          <input type="radio"
                 name="answer2"
                 value="no"
                 checked={this.state.answer2 === "no"}
                 onChange={this.onRadioChange}/> No
          <br/>
          <br/>
          Selected: {this.state.answer2}
          <br/>
          <div className="logo">
            <button className="next-button">
              <NavLink to="/feedback3">Next</NavLink>
            </button>
          </div>
        </div>
    );
  }
}
