import React from 'react';
import { Popup, Icon } from 'semantic-ui-react'

class Health extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
      // Use the station information to determine color, here is the logical check
      // Attach this ternary to the end of all class names
      // this.props.selectedStation.partHealth == 'good' ? 'good-health' : this.props.selectedStation.partHealth == 'warning' ? 'questionable-health' : 'bad-health' 
    return (
      <div style={{height: "100%", width: '100%', backgroundColor: "black"}}>
          <div className="main-body">
                <Popup
                    trigger={<div className="station-screen"></div>}
                    // Add ternary or something to change message based on what's wrong
                    content={"All good"}
                    position='left'
                />
                <Popup
                    trigger={
                        <div className="card-reader">
                            <div className="card-slot"></div>
                            {/* For this div when you attach the ternary append -light to the added className */}
                            <div className="card-light"></div> 
                        </div>
                    }
                    // Add ternary or something to change message based on what's wrong
                    content={"All good"}
                    position='left'
                />
          </div>
          <Popup
            trigger={<div className="pump"></div>}
            // Add ternary or something to change message based on what's wrong
            content={"All good"}
            position='left'
          />
      </div>
    );
  }
}

export default Health;
