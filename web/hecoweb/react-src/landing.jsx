import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Grid, Image, Menu } from 'semantic-ui-react'

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    render() {

        const data = {
            labels: [
                'Red',
                'Green',
                'Yellow',
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                    Palette.graph.main1,
                    Palette.graph.main2,
                    Palette.graph.main3,
                ],
                hoverBackgroundColor: [
                    '#ace1af',
                    '#3fba5a',
                    '#026245',
                ],
            }],
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
                        <Grid.Row>
                            <Image centered src='https://gcn.com/articles/2016/10/05/-/media/GIG/GCN/Redesign/Articles/2016/October/citybigdata.png'/>
                        </Grid.Row>
                        <Grid.Row>
                            <Image src='https://raw.githubusercontent.com/palerdot/react-d3-speedometer/HEAD/speedo.gif'/>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Pie data={data}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Landing;
