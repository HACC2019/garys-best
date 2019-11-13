import React from 'react';
import 'semantic-ui-css/semantic.css';
import ReactSpeedometer from "react-d3-speedometer";
import { CircleMeter, DiskMeter, BlockMeter } from 'react-svg-meters'
import { Bar, Line } from 'react-chartjs-2';
import { Grid, Container, List, Segment, Icon, Divider } from 'semantic-ui-react'

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

    constructor() {
        super();
        this.state = { data: [] };
    }
    componentDidMount() {
        fetch(`https://hecoweb.azurewebsites.net/api/web/gethistorical`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'X-Parse-Application-Id': '12122',
                // 'X-Parse-REST-API-Key': '12121',
                // 'Content-Type': 'application/json',
            }
        })
            // .then(res => JSON.parse())
            // .then(res => console.log(res))
            // .then(res => console.log(res.body))
            // .then(res => console.log(res.json()))
            .then(res => res.json().then(data => this.setState({data: data})));
    }

    render() {

        console.log(this.state.data);

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

        const barStackedData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Off Peak',
                    backgroundColor: '#3d4044',
                    stack: '2',
                    data: [10, 5, 25, 12, 5, 15, 10],
                },
                {
                    label: 'Mid Day',
                    backgroundColor: '#c2bd4e',
                    stack: '2',
                    data: [40, 10, 5, 2, 20, 30, 45],
                },
                {
                    label: 'On Peak',
                    backgroundColor: '#59b655',
                    stack: '2',
                    data: [30, 45, 45, 32, 10, 5, 30],
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

        const lineData2 = {
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

        const lineData = {
            labels: this.state.data.map(x => x['Timestamp']),
            datasets: [{
                label: 'Energy',
                backgroundColor: '#4270B9',
                data: this.state.data.map(x => x['Energy']),
                borderColor: '#4270B9'
            }]
        };

        const useMeterStyle = {
            meter: {
                marginLeft: 55,
            },
            color: {
                foreground: '#59b655',
                background: '#1b1c1d',
                bright: '#ffffff',
            }
        };

        const avgMeterStyle = {
            meter: {
                marginLeft: 50,
            },
            color: {
                foreground: '#59b655',
                background: '#3d4044',
                bright: '#1b1c1d',
            }
        };

        const overallMeterStyle = {
            meter: {
                marginLeft: 30,
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
                            <Grid.Row className='padding'>
                                <h1 className='heco'>HECO[EV]</h1>
                            </Grid.Row>
                            <Segment inverted>
                                <Grid.Row className='padding' centered>
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
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Haleiwa Town Center Charging Station</List.Header>
                                                <List.Description>
                                                    Haleiwa
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Dole Plantation Charging Station</List.Header>
                                                <List.Description>
                                                    Wahiawa
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Waianae Shopping Mall Charging Station</List.Header>
                                                <List.Description>
                                                    Waianae
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'red'} />
                                            <List.Content>
                                                <List.Header as='a'>Kapolei Commons Charging Station</List.Header>
                                                <List.Description>
                                                    Kapolei
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Times Square Shopping Center Charging
                                                    Station</List.Header>
                                                <List.Description>
                                                    Waipahu
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Koolau Center Charging Station</List.Header>
                                                <List.Description>
                                                    Kaneohe
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Iwilei Costco Parking Lot Charging
                                                    Station</List.Header>
                                                <List.Description>
                                                    Honolulu
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Hawaiian Electric Ward Office Charging
                                                    Station</List.Header>
                                                <List.Description>
                                                    Honolulu
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='map marker' color={'green'} />
                                            <List.Content>
                                                <List.Header as='a'>Hawaii Kai 7-Eleven Charging Station</List.Header>
                                                <List.Description>
                                                    Hawaii Kai
                                                </List.Description>
                                            </List.Content>
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
                                                height="425"
                                                frameBorder="0"
                                                scrolling="no"
                                                marginHeight="0"
                                                marginWidth="0"
                                                title="EV Map"
                                                src="//mercedezcastro.maps.arcgis.com/apps/Embed/index.html?webmap=f4c533c1a6d04d98a2b2d37277c7c160&extent=-158.361,21.2603,-157.5521,21.6208&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light">
                                        </iframe>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Bar data={barSideData} />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Line data={lineData} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Line data={lineData2}/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <Bar data={barStackedData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
                        </Grid.Column>

                        <Grid.Column width={3}>
                            <Segment inverted>
                                <Grid.Row>
                                    <h4>User Error Log</h4>
                                    <Divider/>
                                    <List inverted divided>
                                        <List.Item>
                                            <p>October 25, 2019 @ 11:07 pm</p>
                                            <List.Icon name='plug' color={'red'}/>
                                            <List.Content>
                                                <List.Header as='a'>Connection Error</List.Header>
                                                <List.Description>
                                                    Kapolei Commons
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <p>October 25, 2019 @ 11:07 pm</p>
                                            <List.Icon name='credit card' color={'red'}/>
                                            <List.Content>
                                                <List.Header as='a'>Payment Error</List.Header>
                                                <List.Description>
                                                    Kapolei Commons
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <Grid.Row>
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
                                <Grid.Row>
                                    <h4>Current Total Watts</h4>
                                    <ReactSpeedometer
                                        width={200}
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
                                <Grid.Row>
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
