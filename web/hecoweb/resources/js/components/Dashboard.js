import React from 'react';
// import './App.css';
import { Grid, Menu } from 'semantic-ui-react';
import Station from './Station';
import Charts from './Charts';
import Health from './Health';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteFilter: 'all',
      stations: [{name: 'Site A', status: 1, id: 1},{name: 'Site B', status: 0, id: 2}],
      filteredStations: [{name: 'Site A', status: 1, id: 1},{name: 'Site B', status: 0, id: 2}],
      selectedStation: null,
      chartFilter: 'forecast',
    }
    this.handleSiteFilterChange = this.handleSiteFilterChange.bind(this);
    this.handleSelectedStation = this.handleSelectedStation.bind(this);
    this.handleChartFilterChange = this.handleChartFilterChange.bind(this);
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
    this.setState({selectedStation: station});
  }

  handleChartFilterChange(filter) {
    this.setState({chartFilter: filter});
  }

  render() {
    return (
      <div style={{height: "100%", width: "100%", backgroundColor: '#2c2c2c', color: 'white'}}>
        <Grid columns={3} style={{height: '100%'}}>
          {/* Sites */}
          <Grid.Column width={3} style={{backgroundColor: '#2c2c2c'}}>
            <Grid.Row style={{paddingTop: "1em"}}>
              <div style={{fontWeight: 'bold', fontSize:"14pt", textAlign: 'center'}}>
                Charging Stations
              </div>
              <Menu tabular fluid widths={2} style={{marginTop: "1em"}}>
                <Menu.Item
                  name='All'
                  active={this.state.siteFilter === 'all'}
                  onClick={() => this.handleSiteFilterChange('all')}
                  style={{borderRight: "0.5px white solid!important"}}
                />
                <Menu.Item
                  name='Flawed?'
                  active={this.state.siteFilter === 'bad'}
                  onClick={() => this.handleSiteFilterChange('bad')}
                />
              </Menu>
            </Grid.Row>
            <Grid.Row style={{overflowY: 'auto'}}>
              <Station stations={this.state.filteredStations} handleSelectedStation={this.handleSelectedStation} selectedStation={this.state.selectedStation}></Station>
            </Grid.Row>
          </Grid.Column>
          {/* Map and Charts */}
          <Grid.Column width={11} style={{backgroundColor: '#363636'}}>
            <Grid.Row style={{height: '10%', backgroundColor:"#363636", borderBottom: "2px #42454a solid"}}>
              <Grid.Row style={{textAlign: 'center', paddingTop: '1em', borderBottom: "2px #42454a solid"}}>
               <div style={{marginBottom: '0.75em', fontWeight: 'bold', fontSize:"14pt"}}>
                  OVERALL STATUS
                </div>
              </Grid.Row>
              <Grid.Row>
                <Grid columns={'equal'} style={{textAlign: 'center', marginTop: "0.75em"}}>
                  <Grid.Column style={{color: 'lightgreen'}}>
                    1 OK
                  </Grid.Column>
                  <Grid.Column style={{color: '#dbdb24'}}>
                    0 IN DANGER
                  </Grid.Column>
                  <Grid.Column style={{color: 'red'}}>
                    1 BAD
                  </Grid.Column>
                </Grid>
              </Grid.Row>
            </Grid.Row>
            <Grid.Row style={{height: "60%", backgroundColor:"#363636"}}>
              MAP
            </Grid.Row>
           { this.state.selectedStation && <Grid.Row style={{height: "30%", backgroundColor: "#363636", borderTop: "2px #42454a solid"}}>
              <Grid.Row style={{textAlign: "center", marginBottom: '0.75em', fontWeight: 'bold', fontSize:"14pt"}}>
                <div style={{marginTop: '0.5em'}}>
                  Station Statistics
                </div>
                <Menu tabular fluid widths={2} style={{marginTop: "1em"}}>
                  <Menu.Item
                    name='Forecast'
                    active={this.state.chartFilter === 'forecast'}
                    onClick={() => this.handleChartFilterChange('forecast')}
                    style={{borderRight: "0.5px white solid!important"}}
                  />
                  <Menu.Item
                    name='Historical'
                    active={this.state.chartFilter === 'historical'}
                    onClick={() => this.handleChartFilterChange('historical')}
                  />
                </Menu>
              </Grid.Row>
              <Grid.Row>
                <Charts displayDataType={this.state.chartFilter}></Charts>
              </Grid.Row>
            </Grid.Row>}
          </Grid.Column>
          {/* Health Status */}
          { this.state.selectedStation && <Grid.Column width={2} style={{backgroundColor: '#2c2c2c'}}>
            <Grid.Row style={{textAlign: 'center', height: "3.1%", marginTop: '1em', fontSize: '14pt', fontWeight: 'bold'}}>
              Station Status            
            </Grid.Row>
            <Grid.Row style={{textAlign: 'center', height: "4.65%",borderTop: "2px #42454a solid"}}>
              <div style={{textAlign: 'center', marginTop: '.75em', fontSize: '12pt'}}>
                Health Status            
              </div>
            </Grid.Row>
            <Grid.Row style={{height: "30%", borderTop: "2px #42454a solid"}}>
              <Health></Health>
            </Grid.Row>
            <Grid.Row style={{textAlign: 'center', height: "30%", borderTop: "2px #42454a solid"}}>
              <div style={{textAlign: 'center', paddingTop: '.5em', fontSize: '12pt', borderBottom: '2px #42454a solid', paddingBottom: "0.5em"}}>
                Sessions with Errors
              </div>
              <div>
                {/* Insert Audit Log Here */}
              </div>
            </Grid.Row>
            <Grid.Row style={{textAlign: 'center', height: "25%", borderTop: "2px #42454a solid"}}>
              <div style={{textAlign: 'center', paddingTop: '.5em', fontSize: '12pt', borderBottom: '2px #42454a solid', paddingBottom: "0.5em"}}>
                Things to Note
              </div>
              <div>
                {/* Insert things to note here (i.e This station is gonna be wack this Sat) */}
              </div>
            </Grid.Row>
          </Grid.Column>}
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
