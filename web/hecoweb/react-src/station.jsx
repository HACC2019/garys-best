import React from 'react';
import 'semantic-ui-css/semantic.css';
import ReactSpeedometer from "react-d3-speedometer";
import { CircleMeter, DiskMeter, BlockMeter } from 'react-svg-meters'
import { Bar, Line } from 'react-chartjs-2';
import queryString from 'query-string';

import { Grid, Container, List, Segment, Icon, Divider, Accordion, Button } from 'semantic-ui-react'

/** A simple static component to render some text for the landing page. */
class Station extends React.Component {

    constructor() {
        super();
        
        const parsed = queryString.parse(window.location.href.split('station?')[1]);
        const stationId = parsed.id;
        this.state = {
            stationId: stationId,
        };

        this.fetchComments(stationId);
    }

    componentDidMount(){

    }

    fetchComments(stationId) {
        fetch(`https://hecoweb.azurewebsites.net/api/web/getstationhealth?json={"StationID":${stationId}}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json().then(data => {
                const invertedData = {}
                console.log(data)
                // for (let key in data[0]) {
                //     invertedData[key] = data.map(x => x[key])
                // }
                // console.log(invertedData)
                // invertedData['Timestamp'] = invertedData['Timestamp'].map(x => x.split(' ')[0])
                // this.setState({ historicalData: invertedData })
            }));
    }

    fetchLicenses() {
        fetch(`https://hecoweb.azurewebsites.net/api/web/getstationcheckins?json={"Periodicity":${this.state.periodicity}}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json().then(data => {
                const invertedData = {}
                console.log(data)
                // for (let key in data[0]) {
                //     invertedData[key] = data.map(x => x[key])
                // }
                // invertedData['Timestamp'] = invertedData['Timestamp'].map(x => x.split(' ')[0])
                // console.log(invertedData)
                // this.setState({ forecastData: invertedData })
            }));
    }

    render() {

        

        return (
            <Container fluid className='map-background padding'>
            </Container>
        )
    }
}

export default Station;
