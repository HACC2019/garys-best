import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { CircleMeter } from 'react-svg-meters'
import { Bar, Line } from 'react-chartjs-2';
import { Grid, Menu, Container } from 'semantic-ui-react'

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    render() {

        const barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: '#98c255',
                data: [0, 10, 5, 2, 20, 30, 45],
                borderColor: '#98c255'
            }]
        };

        const lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: '#4270B9',
                data: [0, 10, 5, 2, 20, 30, 45],
                borderColor: '#4270B9'
            }]
        };

        const meterStyle = {
            meter: {
                margin: 8,
            },
            color: {
                foreground: '#4184cc',
                background: '#1b1c1d',
                bright: '#ffffff',
            }
        };

        return (
            <Container fluid className='padding'>
                <Grid className='black-background'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Grid.Row className='padding'>
                                <h1 className='heco'>HECO[EV]</h1>
                            </Grid.Row>
                            <Grid.Row className='padding' centered>
                                <CircleMeter value={89}
                                             size={175}
                                             foregroundColor={meterStyle.color.foreground}
                                             backgroundColor={meterStyle.color.background}
                                             style={meterStyle.meter}/>
                            </Grid.Row>
                            <Grid.Row className='padding'>
                                <Menu pointing vertical inverted>
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
                                        <div className="embed-container">
                                            <iframe width="850"
                                                    height="600"
                                                    frameBorder="0"
                                                    scrolling="no"
                                                    marginHeight="0"
                                                    marginWidth="0"
                                                    title="EV Map"
                                                    src="//mercedezcastro.maps.arcgis.com/apps/Embed/index.html?webmap=f4c533c1a6d04d98a2b2d37277c7c160&extent=-158.361,21.2603,-157.5521,21.6208&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light">
                                            </iframe>
                                        </div>
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
                                    value={333}
                                    segments={5}
                                    segmentColors={[
                                        "#bf616a",
                                        "#d08770",
                                        "#ebcb8b",
                                        "#a3be8c",
                                        "#b48ead",
                                    ]}
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
