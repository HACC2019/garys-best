import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { CircleMeter } from 'react-svg-meters'
import { Bar, Line } from 'react-chartjs-2';
import { Grid, Image, Menu, Container } from 'semantic-ui-react'

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    render() {

        const barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(58,255,0)',
                data: [0, 10, 5, 2, 20, 30, 45],
                borderColor: 'rgb(58,255,0)'
            }]
        };

        const lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255,242,42)',
                data: [0, 10, 5, 2, 20, 30, 45],
                borderColor: 'rgb(255,242,42)'
            }]
        };

        const meterStyle = {
            meter: {
                margin: 8,
            },
            color: {
                foreground: '#fdfaff',
                background: '#b8bdbb',
                bright: '#feff82',
            }
        };

        return (
            <Container fluid className='padding'>
                <Grid className='black-background'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Grid.Row className='padding'>
                                <h1 className='h1'>HECO</h1>
                            </Grid.Row>
                            <Grid.Row className='padding' centered>
                                <CircleMeter value={89}
                                             size={175}
                                             foregroundColor={meterStyle.color.foreground}
                                             backgroundColor={meterStyle.color.background}
                                             style={meterStyle.meter}/>
                            </Grid.Row>
                            <Grid.Row className='padding'>
                                <Menu pointing vertical>
                                    <Menu.Item
                                        name='Dashboard'
                                    />
                                    <Menu.Item
                                        name='User Audit'
                                    />
                                    <Menu.Item
                                        name='Settings'
                                    />
                                    <Menu.Item
                                        name='Logout'
                                    />
                                </Menu>
                            </Grid.Row>
                        </Grid.Column>


                        <Grid.Column width={10}>
                            <Grid divided='vertically'>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <Image
                                            src='https://www.pobonline.com/ext/resources/POB/2016/08-August/POB-Esri-Streamflow-08302016.jpg?1472586109'/>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Bar data={barData}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Line data={lineData}/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>


                        <Grid.Column width={3}>
                            <Grid.Row>
                                <ReactSpeedometer
                                    width={200}
                                    height={200}
                                    maxValue={500}
                                    value={473}
                                    needleColor="red"
                                    startColor="green"
                                    segments={10}
                                    endColor="blue"
                                />
                            </Grid.Row>
                            <Grid.Row>
                                <ReactSpeedometer
                                    width={200}
                                    height={200}
                                    maxValue={500}
                                    value={473}
                                    needleColor="red"
                                    startColor="green"
                                    segments={10}
                                    endColor="blue"
                                />
                            </Grid.Row>
                            <Grid.Row>
                                <ReactSpeedometer
                                    width={200}
                                    height={200}
                                    customSegmentStops={[0, 500, 750, 900, 1000]}
                                    segmentColors={["firebrick", "tomato", "gold", "limegreen"]}
                                    value={333}
                                />
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Landing;
