import React from 'react';
// import './App.css';
import { Grid, Menu } from 'semantic-ui-react';
import Station from './Station'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteFilter: 'all',
      stations: [{name: 'Site A', status: 1, id: 1},{name: 'Site B', status: 0, id: 2}],
      filteredStations: [{name: 'Site A', status: 1, id: 1},{name: 'Site B', status: 0, id: 2}],
      selectedStation: null,
    }
    this.handleSiteFilterChange = this.handleSiteFilterChange.bind(this);
    this.handleSelectedStation = this.handleSelectedStation.bind(this);
  }

  handleSiteFilterChange(filterSetting) {
    let newFilteredStations = [];
    this.state.stations.forEach(station => {
      if (filterSetting == 'bad') {
        if (station.status != 1) {
          newFilteredStations.push(station);
        }
      } else {
        newFilteredStations.push(station);
      }
    });
    this.setState({siteFilter: filterSetting, filteredStations: newFilteredStations});
  }

  handleSelectedStation(station) {
    console.log(station);
    
    this.setState({selectedStation: station})
  }

  render() {
    return (
      <div style={{height: "100%", width: "100%", backgroundColor: 'black'}}>
        <Grid columns={3} style={{height: '100%'}}>
          {/* Sites */}
          <Grid.Column width={2} style={{backgroundColor: 'hotpink'}}>
            <Grid.Row>
              <span style={{fontWeight: 'bold', fontSize:"14pt"}}>
                Charging Stations
              </span>
              <Menu tabular fluid widths={2} style={{marginTop: "1em"}}>
                <Menu.Item
                  name='All'
                  active={this.state.siteFilter === 'all'}
                  onClick={() => this.handleSiteFilterChange('all')}
                />
                <Menu.Item
                  name='Flawed?'
                  active={this.state.siteFilter === 'bad'}
                  onClick={() => this.handleSiteFilterChange('bad')}
                />
              </Menu>
            </Grid.Row>
            <Grid.Row>
              <Station stations={this.state.filteredStations} handleSelectedStation={this.handleSelectedStation}></Station>
            </Grid.Row>
          </Grid.Column>
          {/* Map and Charts */}
          <Grid.Column width={10} style={{backgroundColor: 'white'}}>
            <Grid.Row style={{height: '10%', backgroundColor:"lightblue"}}>
              <Grid.Row>
               OVERALL STATUS
              </Grid.Row>
              <Grid.Row>
                <Grid columns={'equal'} style={{textAlign: 'center'}}>
                  <Grid.Column>
                    1 OK
                  </Grid.Column>
                  <Grid.Column>
                    0 IN DANGER
                  </Grid.Column>
                  <Grid.Column>
                    1 BAD
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid.Row>
            <Grid.Row style={{height: "60%", backgroundColor:"green"}}>
              MAP
            </Grid.Row>
            <Grid.Row style={{height: "30%", backgroundColor: "orange"}}>
              Historical/Forecast
            </Grid.Row>
          </Grid.Column>
          {/* Health Status */}
          <Grid.Column width={4} style={{backgroundColor: 'hotpink'}}>
            <Grid.Row>
              Health Status            
            </Grid.Row>
            <Grid.Row>
              CHARGING STATION MOCKUP GOES HERE
            </Grid.Row>
            <Grid.Row>
              Expected Results
            </Grid.Row>
            <Grid.Row>
              Things to Note about this station
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
