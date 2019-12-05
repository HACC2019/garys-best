import React from "react";
import { NavLink } from 'react-router-dom';

export default class Question_1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer1: ""
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
          <h3>Was the Charging Session Successful? </h3>
          <input type="radio"
                 name="answer1"
                 value="yes"
                 checked={this.state.answer1 === "yes"}
                 onChange={this.onRadioChange}/> Yes
          <br/>
          <input type="radio"
                 name="answer1"
                 value="no"
                 checked={this.state.answer1 === "no"}
                 onChange={this.onRadioChange}/> No
          <br/>
          <br/>
          Selected: {this.state.answer1}
          <br/>
          <div className="logo">
            <button className="next-button">
              <NavLink to="/feedback2">Next</NavLink>
            </button>
          </div>
        </div>
    );
  }
}
