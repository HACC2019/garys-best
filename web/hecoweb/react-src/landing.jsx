import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { Bar, Line } from 'react-chartjs-2';
import { Grid, Image, Menu } from 'semantic-ui-react'

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

        return (

            <Grid celled='internally'>
                <Grid.Row>
                    <Grid.Column width={3}>
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
                                width={250}
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
                                width={250}
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
                                width={250}
                                height={200}
                                customSegmentStops={[0, 500, 750, 900, 1000]}
                                segmentColors={["firebrick", "tomato", "gold", "limegreen"]}
                                value={333}
                            />
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Landing;
