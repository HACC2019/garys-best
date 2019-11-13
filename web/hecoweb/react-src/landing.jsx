import React from 'react';
import 'semantic-ui-css/semantic.css';
import ReactSpeedometer from "react-d3-speedometer";
import { CircleMeter, DiskMeter, BlockMeter } from 'react-svg-meters'
import { Bar, Line } from 'react-chartjs-2';
import { Grid, Container, List, Segment, Icon, Divider, Accordion, Button } from 'semantic-ui-react'

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

    constructor() {
        super();
        this.handleHistoricalDataClick = this.handleHistoricalDataClick.bind(this)
        this.handleForecastDataClick = this.handleForecastDataClick.bind(this)
        this.state = {
            historicalData: [],
            forecastData: [],
            historical: true,
        };
        this.fetchForecast();
        this.fetchHistorical();
        
    }

    fetchHistorical() {
        fetch(`https://hecoweb.azurewebsites.net/api/web/gethistorical`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json().then(data => {
                const invertedData = {}
                console.log(data)
                for (let key in data[0]) {
                    invertedData[key] = data.map(x => x[key])
                }
                console.log(invertedData)
                invertedData['Timestamp'] = invertedData['Timestamp'].map(x => x.split(' ')[0])
                this.setState({ historicalData: invertedData })
            }));
    }

    fetchForecast() {
        fetch(`https://hecoweb.azurewebsites.net/api/web/getforecast`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json().then(data => {
                const invertedData = {}
                console.log(data)
                for (let key in data[0]) {
                    invertedData[key] = data.map(x => x[key])
                }
                invertedData['Timestamp'] = invertedData['Timestamp'].map(x => x.split(' ')[0])
                console.log(invertedData)
                this.setState({ forecastData: invertedData })
            }));
    }

    handleHistoricalDataClick(){
        this.setState({historical: true})
    }

    handleForecastDataClick(){
        this.setState({historical: false})
    }

    render() {

        // let data = this.state.historicalData;
        // console.log(this.state.historical)
        // console.log(data)


        // if (this.state.historical) {
        //     data = this.state.historicalData;
        // }
        // else {
        //     data = this.state.forescastData;
        // }

        let data = this.state.forecastData;
        console.log(this.state.forecastData);

        const barSideData = {
            type: ' bar',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Traffic',
                    backgroundColor: '#59b655',
                    data: [40, 10, 5, 2, 20, 30, 45],
                },
                {
                    label: 'Congestion',
                    data: [10, 5, 25, 12, 5, 15, 10],
                    backgroundColor: '#c2bd4e',
                }]
        };

        const trafficData = {
            labels: this.state.historical ? this.state.historicalData['Timestamp'] : this.state.forescastData['Timestamp'],
            datasets: [
                {
                    label: 'Off Peak',
                    backgroundColor: '#3d4044',
                    stack: '2',
                    data: this.state.historical ? this.state.historicalData['OffPeak'] : this.state.forecastData['OffPeak'],
                },
                {
                    label: 'Mid Day',
                    backgroundColor: '#c2bd4e',
                    stack: '2',
                    data: this.state.historical ? this.state.historicalData['MidDay'] : this.state.forescastData['MidDay'],
                },
                {
                    label: 'On Peak',
                    backgroundColor: '#59b655',
                    stack: '2',
                    data: this.state.historical ? this.state.historicalData['OnPeak'] : this.state.forescastData['OnPeak'],
                },
            ],
        };

        const errorData = {
            labels: data['Timestamp'],
            datasets: [
                {
                    label: 'Payment Error',
                    backgroundColor: '#c2bd4e',
                    stack: '2',
                    data: data['ErrorCalculation'],
                },
                {
                    label: 'Rounding Error',
                    backgroundColor: '#59b655',
                    stack: '2',
                    data: data['ErrorRounding'],
                },
            ],
        };

        const sessionData = {
            labels: data['Timestamp'],
            datasets: [
                {
                    label: 'Device',
                    backgroundColor: '#3d4044',
                    stack: '2',
                    data: data['SessionTypeDevice'],
                },
                {
                    label: 'Mobile',
                    backgroundColor: '#c2bd4e',
                    stack: '2',
                    data: data['SessionTypeMobile'],
                },
                {
                    label: 'Web',
                    backgroundColor: '#59b655',
                    stack: '2',
                    data: data['SessionTypeWeb'],
                },
            ],
        };

        const barStackedOptions = {
            legend: {
                display: true,
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                    },
                ],
            },
        };

        const energyData2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Energy Forecast',
                    borderColor: '#59b655',
                    backgroundColor: 'rgba(89,182,85,0.55)',
                    stack: '1',
                    data: [10, 5, 25, 12, 5, 15, 10],
                },
                {
                    label: 'Usage Forecast',
                    borderColor: '#4270B9',
                    backgroundColor: 'rgba(82,151,242,0.54)',
                    stack: '2',
                    data: [40, 10, 5, 2, 20, 30, 45],
                }
            ],
            options: {
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        };

        const energyData = {
            labels: data['Timestamp'],
            datasets: [{
                label: 'Energy',
                backgroundColor: '#4270B980',
                data: data['Energy'],
                borderColor: '#4270B9'
            }]
        };

        const useMeterStyle = {
            meter: {
                marginLeft: 0,
            },
            color: {
                foreground: '#59b655',
                background: '#1b1c1d',
                bright: '#ffffff',
            }
        };

        const avgMeterStyle = {
            meter: {
                marginLeft: 0,
            },
            color: {
                foreground: '#59b655',
                background: '#3d4044',
                bright: '#1b1c1d',
            }
        };

        const overallMeterStyle = {
            meter: {
                marginLeft: 0,
            },
            color: {
                foreground: '#59b655',
                background: '#1b1c1d',
                bright: '#ffffff',
            }
        };

        return (
            <Container fluid className='padding'>
                <Grid className='map-background'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Segment inverted>
                                <Grid.Row style={{ textAlign: 'center' }}>
                                    <h1 className='heco'>HECO[EV]</h1>
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <Grid.Row className='padding' style={{ textAlign: 'center' }}>
                                    <h4>Overall Station Health</h4>
                                    <CircleMeter value={88}
                                        size={125}
                                        foregroundColor={overallMeterStyle.color.foreground}
                                        backgroundColor={overallMeterStyle.color.background}
                                        style={overallMeterStyle.meter} />
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <Grid.Row className='padding'>
                                    <List divided inverted relaxed>
                                        <List.Item className={this.state.activeIndex == 0 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex}
                                                    index={0}
                                                    onClick={() => this.openSiteDetails(0)}>
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Haleiwa Town Center Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Haleiwa
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 0}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 1 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 1}
                                                    index={1}
                                                    onClick={() => this.openSiteDetails(1)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Dole Plantation Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Wahiawa
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 1}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 2 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 2}
                                                    index={2}
                                                    onClick={() => this.openSiteDetails(2)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Waianae Shopping Mall Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Waianae
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 2}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 3 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 3}
                                                    index={3}
                                                    onClick={() => this.openSiteDetails(3)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'red'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Kapolei Commons Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Kapolei
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 3}>
                                                    <List style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <List.Item>
                                                            <p>October 25, 2019 @ 11:07 pm</p>
                                                            <List.Icon name='plug' color={'red'} />
                                                            <List.Content>
                                                                <List.Header as='a'>Connection Error</List.Header>
                                                            </List.Content>
                                                        </List.Item>
                                                        <Divider />
                                                        <List.Item>
                                                            <p>October 25, 2019 @ 11:07 pm</p>
                                                            <List.Icon name='credit card' color={'red'} />
                                                            <List.Content>
                                                                <List.Header as='a'>Payment Error</List.Header>
                                                            </List.Content>
                                                        </List.Item>
                                                    </List>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 4 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 4}
                                                    index={4}
                                                    onClick={() => this.openSiteDetails(4)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Times Square Shopping Center Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Waipahu
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 4}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 5 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 5}
                                                    index={5}
                                                    onClick={() => this.openSiteDetails(5)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Koolau Center Charging Station</List.Header>
                                                        <List.Description>
                                                            Kaneohe
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 5}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 6 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 6}
                                                    index={6}
                                                    onClick={() => this.openSiteDetails(6)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Iwilei Costco Parking Lot Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Honolulu
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 6}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 7 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 7}
                                                    index={7}
                                                    onClick={() => this.openSiteDetails(7)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Hawaiian Electric Ward Office Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Honolulu
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 7}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                        <List.Item className={this.state.activeIndex == 8 ? 'stationSelected' : ''}>
                                            <Accordion>
                                                <Accordion.Title
                                                    active={this.state.activeIndex === 8}
                                                    index={8}
                                                    onClick={() => this.openSiteDetails(8)}
                                                >
                                                    <List.Icon style={{
                                                        display: 'table-cell',
                                                        margin: 0,
                                                        paddingTop: 0,
                                                        paddingRight: '.28571429em',
                                                        verticalAlign: 'top',
                                                        WebkitTransition: 'color .1s ease',
                                                        transition: 'color .1s ease',
                                                    }} name='map marker' color={'green'} />
                                                    <List.Content style={{
                                                        display: 'table-cell',
                                                        width: '100%',
                                                        padding: '0 0 0 .5em',
                                                        verticalAlign: 'top'
                                                    }}>
                                                        <List.Header as='a'>Hawaii Kai 7-Eleven Charging
                                                            Station</List.Header>
                                                        <List.Description>
                                                            Hawaii Kai
                                                        </List.Description>
                                                    </List.Content>
                                                </Accordion.Title>
                                                <Accordion.Content active={this.state.activeIndex === 8}>
                                                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                                                        <li>
                                                            All Good
                                                        </li>
                                                    </ul>
                                                </Accordion.Content>
                                            </Accordion>
                                        </List.Item>
                                    </List>
                                </Grid.Row>
                            </Segment>
                        </Grid.Column>


                        <Grid.Column width={10}>
                            <Grid>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <iframe width="100%"
                                            height="370"
                                            frameBorder="0"
                                            scrolling="no"
                                            marginHeight="0"
                                            marginWidth="0"
                                            title="EV Map"
                                            src="//mercedezcastro.maps.arcgis.com/apps/Embed/index.html?webmap=f4c533c1a6d04d98a2b2d37277c7c160&extent=-158.361,21.2603,-157.5521,21.6208&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light">
                                        </iframe>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row columns={1} style={{ textAlign: 'center', padding: 0 }}>
                                    <Grid.Column>
                                        <Segment inverted style={{ padding: 5 }}>
                                            <Button.Group>
                                                <Button size='mini' color='green' onClick={this.handleHistoricalDataClick}>Historical Data</Button>
                                                <Button.Or />
                                                <Button size='mini' color='blue' onClick={this.handleForecastDataClick}>Forecasted Data</Button>
                                            </Button.Group>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Bar data={sessionData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Line data={energyData} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Bar data={errorData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Bar data={trafficData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
                        </Grid.Column>

                        <Grid.Column width={3}>
                            <Segment inverted style={{ overflow: 'auto', maxHeight: 200 }}>
                                <Grid.Row>
                                    <h4>User Error Log</h4>
                                    <Divider />
                                    <List inverted divided>
                                        <List.Item>
                                            <p>October 25, 2019 @ 11:07 pm</p>
                                            <List.Icon name='heartbeat' color={'red'} />
                                            <List.Content>
                                                <List.Header as='a'>Station Error</List.Header>
                                                <List.Description>
                                                    Kapolei Commons
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <p>October 6, 2019 @ 02:45 pm</p>
                                            <List.Icon name='plug' color={'red'} />
                                            <List.Content>
                                                <List.Header as='a'>Connection Error</List.Header>
                                                <List.Description>
                                                    Haleiwa Town Center
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <p>September 18, 2019 @ 05:55 pm</p>
                                            <List.Icon name='credit card' color={'red'} />
                                            <List.Content>
                                                <List.Header as='a'>Payment Error</List.Header>
                                                <List.Description>
                                                    Iwilei Costco Parking Lot
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <p>September 2, 2019 @ 10:29 am</p>
                                            <List.Icon name='heartbeat' color={'red'} />
                                            <List.Content>
                                                <List.Header as='a'>Station Error</List.Header>
                                                <List.Description>
                                                    Kapolei Commons
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <p>August 19, 2019 @ 09:17 am</p>
                                            <List.Icon name='plug' color={'red'} />
                                            <List.Content>
                                                <List.Header as='a'>Connection Error</List.Header>
                                                <List.Description>
                                                    Kapolei Commons
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <Grid.Row style={{ textAlign: 'center' }}>
                                    <h4>Active Charging Sessions</h4>
                                    <DiskMeter
                                        value={25}
                                        size={100}
                                        backgroundColor={useMeterStyle.color.foreground}
                                        textColor={useMeterStyle.color.foreground}
                                        borderColor={useMeterStyle.color.foreground}
                                        style={useMeterStyle.meter}
                                    />
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <Grid.Row style={{ textAlign: 'center' }}>
                                    <h4>Current Total Watts</h4>
                                    <ReactSpeedometer
                                        width={190}
                                        height={125}
                                        maxValue={500}
                                        value={116}
                                        needleColor="black"
                                        startColor="green"
                                        segments={4}
                                        endColor="blue"
                                    />
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <h4>Average Charge Duration</h4>
                                <Grid.Row style={{ textAlign: 'center' }}>
                                    <BlockMeter
                                        value={75}
                                        size={110}
                                        foregroundColor={avgMeterStyle.color.foreground}
                                        backgroundColor={avgMeterStyle.color.background}
                                        textColor={avgMeterStyle.color.bright}
                                        style={avgMeterStyle.meter}
                                    />
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <h4>Total Revenue</h4>
                                <h2 className='revenue'>$26,179</h2>
                                <Grid.Row>
                                    <p className='pBold'>24% <Icon name='arrow circle down' size='small'
                                        color='red' /></p>
                                    <p>(from previous period)</p>
                                </Grid.Row>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Landing;
