import React from 'react';
import { Grid } from 'semantic-ui-react'

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // The Charts go here, but I don't know how the data will be processed, but here is a general layout that you can choose to use
  render() {
    // let chart = 
    // {this.props.stations.map((chart) =>
    //     <Grid.Column key={chart}>
    //         <div style={{backgroundColor: #2c2c2c, width: "fit-content", height: "fit-content"}}>
    //           The chart goes here
    //         </div>
    //     </Grid.Column>
    // )}
    return (
      <Grid style={{width: '100%'}}>
          {/* {charts} */}
      </Grid>
    );
  }
}

export default Charts;
