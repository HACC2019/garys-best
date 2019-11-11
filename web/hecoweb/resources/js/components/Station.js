import React from 'react';
import { Grid } from 'semantic-ui-react'

class Station extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(this.props.selectedStation);
    
    let stations = 
    <Grid>
        {this.props.stations.map((station) =>
                    <Grid.Row key={station.id} onClick={() => this.props.handleSelectedStation(station)} style={{padding: '1em'}} className={"station" + (this.props.selectedStation && this.props.selectedStation.id == station.id ? " isSelected" : "")}>
                        <Grid.Column width={14}>
                            {station.name}
                        </Grid.Column>
                        <Grid.Column width={2}>
                            {station.status === 1 ? "OK" : station.status === 0 ? "?" : "!"}
                        </Grid.Column>
                    </Grid.Row>
        )}
    </Grid>
    return (
      <div style={{width: '100%'}}>
          {stations}
      </div>
    );
  }
}

export default Station;
