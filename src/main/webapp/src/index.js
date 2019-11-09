import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
import { Chart } from 'react-google-charts';
import { Menu, Grid, Icon, Container, Header, Image, Dropdown } from 'semantic-ui-react';

class Top extends React.Component {
  render() {
    return (
        <Menu borderless className="topmenu">
          <Container>
            <Menu.Item><Image size='tiny' src="/logo/gary.png"/>BETA</Menu.Item>
            <Menu.Item position='right'>Home</Menu.Item>
            <Dropdown item text='Energy Dashboard'>
              <Dropdown.Menu>
                <Dropdown.Item>Today</Dropdown.Item>
                <Dropdown.Item>Month</Dropdown.Item>
                <Dropdown.Item>Year</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>Map</Menu.Item>
            <Menu.Item><Icon name={'search'}/></Menu.Item>
          </Container>
        </Menu>
    )
  }
}

class Mid extends React.Component {
  render() {

    return (
        <div className="mid-bg">
          <Grid container verticalAlign="middle">
            <Grid.Row columns="two">
              <Grid.Column>
                <Chart
                    width={'550px'}
                    height={'450px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Month-yr', 'Total Cost ($)'],
                      ['Sep-18', 100],
                      ['Oct-18', 200],
                      ['Nov-18', 300],
                      ['Dec-18', 400],
                      ['Jan-19', 100],
                      ['Feb-19', 200],
                      ['Mar-19', 300],
                      ['Apr-19', 400],
                      ['May-19', 100],
                      ['Jun-19', 200],
                      ['Jul-19', 300],
                      ['Aug-19', 300],
                    ]}
                    options={{
                      title: 'COST PREDICTED (Average)',
                      backgroundColor: '#add8e6',
                      // Just add this option
                      is3D: true,
                      chartArea: { width: '50%' },
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
              </Grid.Column>

              <Grid.Column>
                <div className="description">
                  <Header as='h3'>
                    Cost predicted (Daily kW)
                  </Header>


                  <Chart
                      width={'800px'}
                      height={'400px'}
                      chartType="Table"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Total Duration (Min)', 'Total Cost ($)', 'Date'],
                        [
                          '120',
                          '100',
                          new Date(2018, 8, 1),
                        ],
                        [
                          '200',
                          '240',
                          new Date(2018, 8, 2),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 8, 3),
                        ],
                        [
                          '500',
                          '800',
                          new Date(2018, 8, 4),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 8, 5),
                        ],
                        [
                          '250',
                          '280',
                          new Date(2018, 8, 10),
                        ],
                        [
                          '600',
                          '650',
                          new Date(2018, 9, 30),
                        ],
                        [
                          '1000',
                          '1050',
                          new Date(2018, 10, 18),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 10, 26),
                        ],
                        [
                          '550',
                          '600',
                          new Date(2018, 10, 27),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 0, 30),
                        ],
                        [
                          '300',
                          '280',
                          new Date(2019, 7, 26),
                        ],

                      ]}
                      rootProps={{ 'data-testid': '1' }}
                      chartPackages={['corechart', 'controls']}
                      controls={[
                        {
                          controlType: 'DateRangeFilter',
                          options: {
                            filterColumnLabel: 'Date',
                            ui: { format: { pattern: '' } },
                          },
                        },
                      ]}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="two">
              <Grid.Column>
                <Chart
                    width={550}
                    height={500}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Month-yr', 'Total Cost ($)'],
                      ['Sep-18', 100],
                      ['Oct-18', 200],
                      ['Nov-18', 300],
                      ['Dec-18', 400],
                      ['Jan-19', 100],
                      ['Feb-19', 200],
                      ['Mar-19', 300],
                      ['Apr-19', 400],
                      ['May-19', 100],
                      ['Jun-19', 200],
                      ['Jul-19', 300],
                      ['Aug-19', 300],
                    ]}
                    options={{
                      title: 'CHANGE IN COST (Average)',
                      backgroundColor: '#add8e6',
                      chartArea: { width: '50%' },
                      hAxis: {
                        title: 'Month-year',
                        minValue: 0,
                      },
                      vAxis: {
                        title: 'Amount',
                      },
                    }}
                    legendToggle
                />
              </Grid.Column>

              <Grid.Column>
                <div className="description">
                  <Header as='h3'>
                    Change in cost (Daily kW)
                  </Header>

                  <Chart
                      width={'800px'}
                      height={'400px'}
                      chartType="Table"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Total Duration (Min)', 'Total Cost ($)', 'Date'],
                        [
                          '120',
                          '100',
                          new Date(2018, 8, 1),
                        ],
                        [
                          '200',
                          '240',
                          new Date(2018, 8, 2),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 8, 3),
                        ],
                        [
                          '500',
                          '800',
                          new Date(2018, 8, 4),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 8, 5),
                        ],
                        [
                          '250',
                          '280',
                          new Date(2018, 8, 10),
                        ],
                        [
                          '600',
                          '650',
                          new Date(2018, 9, 30),
                        ],
                        [
                          '1000',
                          '1050',
                          new Date(2018, 10, 18),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 10, 26),
                        ],
                        [
                          '550',
                          '600',
                          new Date(2018, 10, 27),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 0, 30),
                        ],
                        [
                          '300',
                          '280',
                          new Date(2019, 7, 26),
                        ],

                      ]}
                      rootProps={{ 'data-testid': '1' }}
                      chartPackages={['corechart', 'controls']}
                      controls={[
                        {
                          controlType: 'DateRangeFilter',
                          options: {
                            filterColumnLabel: 'Date',
                            ui: { format: { pattern: '' } },
                          },
                        },
                      ]}
                  />

                </div>
              </Grid.Column>

            </Grid.Row>


            <Grid.Row columns="two">
              <Grid.Column>
                <Chart
                    width={550}
                    height={'500px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Year', 'kWh', 'Threshold'],
                      ['Sep-18', 100, 80],
                      ['Oct-18', 200, 90],
                      ['Nov-18', 300, 120],
                      ['Dec-18', 400, 140],
                      ['Jan-19', 120, 180],
                      ['Feb-19', 178, 200],
                      ['Mar-19', 287, 160],
                      ['Apr-19', 394, 140],
                      ['May-19', 300, 130],
                      ['Jun-19', 200, 110],
                      ['Jul-19', 350, 120],
                      ['Aug-19', 300, 150],
                    ]}
                    options={{
                      title: 'USAGE ESTIMATE (Average)',
                      hAxis: { title: 'Month-year', titleTextStyle: { color: '#333' } },
                      vAxis: { minValue: 0 },
                      backgroundColor: '#add8e6',
                      // For the legend to fit, we make the chart area smaller
                      chartArea: { width: '50%' },
                      // lineWidth: 25
                    }}
                />
              </Grid.Column>

              <Grid.Column>
                <div className="description">
                  <Header as='h3'>
                    Usage Estimate (Daily kW)
                  </Header>

                  <Chart
                      width={'800px'}
                      height={'400px'}
                      chartType="Table"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Total Duration (Min)', 'Total Cost ($)', 'Date'],
                        [
                          '120',
                          '100',
                          new Date(2018, 8, 1),
                        ],
                        [
                          '200',
                          '240',
                          new Date(2018, 8, 2),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 8, 3),
                        ],
                        [
                          '500',
                          '800',
                          new Date(2018, 8, 4),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 8, 5),
                        ],
                        [
                          '250',
                          '280',
                          new Date(2018, 8, 10),
                        ],
                        [
                          '600',
                          '650',
                          new Date(2018, 9, 30),
                        ],
                        [
                          '1000',
                          '1050',
                          new Date(2018, 10, 18),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 10, 26),
                        ],
                        [
                          '550',
                          '600',
                          new Date(2018, 10, 27),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 10, 30),
                        ],
                        [
                          '300',
                          '280',
                          new Date(2019, 7, 26),
                        ],

                      ]}
                      rootProps={{ 'data-testid': '1' }}
                      chartPackages={['corechart', 'controls']}
                      controls={[
                        {
                          controlType: 'DateRangeFilter',
                          options: {
                            filterColumnLabel: 'Date',
                            ui: { format: { pattern: '' } },
                          },
                        },
                      ]}
                  />
                </div>
              </Grid.Column>

            </Grid.Row>


            <Grid.Row columns="two">
              <Grid.Column>
                <Chart
                    width={'550px'}
                    height={'500px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Location', ' Total Energy (kWh)'],
                      ['A', 10000],
                      ['B', 20000],
                    ]}
                    options={{
                      title: 'TOTAL ENERGY SPENT',
                      backgroundColor: '#add8e6',
                      chartArea: { width: '50%' },
                      hAxis: {
                        title: 'Total Energy(kWh)',
                        minValue: 0,
                      },
                      vAxis: {
                        title: 'Location',
                      },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                />
              </Grid.Column>

              <Grid.Column>
                <div className="description">
                  <Header as='h3'>
                    Station (Daily kW)
                  </Header>

                  <Chart
                      width={'800px'}
                      height={'400px'}
                      chartType="Table"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Total Duration (Min)', 'Total Cost ($)', 'Date'],
                        [
                          '120',
                          '100',
                          new Date(2018, 8, 1),
                        ],
                        [
                          '200',
                          '240',
                          new Date(2018, 8, 2),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 8, 3),
                        ],
                        [
                          '500',
                          '800',
                          new Date(2018, 8, 4),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 8, 5),
                        ],
                        [
                          '250',
                          '280',
                          new Date(2018, 8, 10),
                        ],
                        [
                          '600',
                          '650',
                          new Date(2018, 9, 30),
                        ],
                        [
                          '1000',
                          '1050',
                          new Date(2018, 10, 18),
                        ],
                        [
                          '330',
                          '290',
                          new Date(2018, 10, 26),
                        ],
                        [
                          '550',
                          '600',
                          new Date(2018, 10, 27),
                        ],
                        [
                          '450',
                          '480',
                          new Date(2018, 10, 30),
                        ],
                        [
                          '300',
                          '280',
                          new Date(2019, 7, 27),
                        ],

                      ]}
                      rootProps={{ 'data-testid': '1' }}
                      chartPackages={['corechart', 'controls']}
                      controls={[
                        {
                          controlType: 'DateRangeFilter',
                          options: {
                            filterColumnLabel: 'Date',
                            ui: { format: { pattern: '' } },
                          },
                        },
                      ]}
                  />
                </div>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </div>

    )
  }
}

class Garys extends React.Component {
  render() {
    return (
        <div>
          <Top/>
          <Mid/>
        </div>
    )
  }
}

ReactDOM.render(
    <Garys/>,
    document.getElementById('root')
);
