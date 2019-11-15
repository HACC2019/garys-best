import React from 'react';
import 'semantic-ui-css/semantic.css';
import DatePicker from 'react-datepicker';
import ReactSpeedometer from "react-d3-speedometer";
import { CircleMeter, DiskMeter, BlockMeter } from 'react-svg-meters'
import { Bar, Line } from 'react-chartjs-2';
import 'react-datepicker/dist/react-datepicker.css'
import { Grid, Container, List, Segment, Icon, Divider, Accordion, Button, Image, Label } from 'semantic-ui-react'
import axios from 'axios'

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

    constructor() {
        super();
        this.handleHistoricalDataClick = this.handleHistoricalDataClick.bind(this)
        this.handleForecastDataClick = this.handleForecastDataClick.bind(this)
        this.getStationHealthRender = this.getStationHealthRender.bind(this)
        this.openSiteDetails = this.openSiteDetails.bind(this);
        this.startHandleChange = this.startHandleChange.bind(this);
        this.endHandleChange = this.endHandleChange.bind(this);
        this.showAllStations = this.showAllStations.bind(this);

        this.state = {
            historicalData: [],
            forecastData: [],
            historical: true,
            activeIndex: -1,
            startDate: new Date(2018, 9, 1),
            endDate: new Date(2019, 8, 30),
            stationHealth: {}
        };

        this.fetchHistorical(-1);
        this.fetchForecast(-1);

        this.fetchStationHealth(1);
        this.fetchStationHealth(2);

        console.log(this.state);
    }

    fetchHistorical(stationID) {
        const activeIndex = stationID
        if (stationID !== -1) {
            stationID = stationID === null ? -1 : stationID
            stationID += 1
            stationID = stationID > 2 ? -1 : stationID
        }

        fetch(`https://hecoweb.azurewebsites.net/api/web/gethistorical?StationID=${stationID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json().then(data => {
                console.log(`Fetched Historical Data for StationID ${stationID}`)
                const invertedData = {}
                for (let key in data[0]) {
                    invertedData[key] = data.map(x => x[key])
                }
                console.log(invertedData)
                invertedData['Timestamp'] = invertedData['Timestamp'].map(x => x.split(' ')[0])
                invertedData['Energy'] = invertedData['Energy'].map(x => parseFloat(x));
                invertedData['CorrectAmount'] = invertedData['CorrectAmount'].map(x => parseFloat(x));
                for (let key of ['OnPeak', 'OffPeak', 'MidDay', 'ErrorRounding', 'ErrorCalculation']) {
                    invertedData[key] = invertedData[key].map(x => parseInt(x));
                }
                this.setState({ historicalData: invertedData, activeIndex: activeIndex })
            }));
    }

    fetchForecast(stationID) {
        const activeIndex = stationID
        if (stationID !== -1) {
            stationID = stationID === null ? -1 : stationID
            stationID += 1
            stationID = stationID > 2 ? -1 : stationID
        }
        fetch(`https://hecoweb.azurewebsites.net/api/web/getforecast?StationID=${stationID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json().then(data => {
                console.log(`Fetched Forecasting Data for StationID ${stationID}`)
                const invertedData = {}
                for (let key in data[0]) {
                    invertedData[key] = data.map(x => x[key])
                }
                console.log(invertedData)
                invertedData['Timestamp'] = invertedData['Timestamp'].map(x => x.split(' ')[0])
                invertedData['Energy'] = invertedData['Energy'].map(x => parseFloat(x));
                for (let key of ['OnPeak', 'OffPeak', 'MidDay', 'ErrorRounding', 'ErrorCalculation']) {
                    console.log(key)
                    invertedData[key] = invertedData[key].map(x => parseInt(x));
                }
                this.setState({ forecastData: invertedData, activeIndex: activeIndex })
            }));
    }

    fetchStationHealth(stationId) {
        axios.get(`https://hecoweb.azurewebsites.net/api/web/getstationhealth?json={"StationID":${stationId}}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {
            let stationHealth = this.state.stationHealth;
            stationHealth[stationId] = response.data;
            this.setState({ stationHealth: stationHealth });
        })
    }

    healthStats(){
        let allItems = []
        if(this.state.stationHealth['1']){
            this.state.stationHealth['1'].forEach((ticket) => {
                ticket.stationId = 1;
                allItems.push(ticket);
            })
        }
        if(this.state.stationHealth['2']){
            this.state.stationHealth['2'].forEach((ticket) => {
                ticket.stationId = 2;
                allItems.push(ticket);
            })
        }
        return (
            <div>
            {allItems.sort((a, b) => b.Timestamp - a.Timestamp).map((item) => {
                return this.healthItem(item, true);
            })}
            </div>
        )
    }

    healthItem(current, fromErrorLog){
        // {"DidTheCarCharge":"0","CardDeclined":"0","CardReaderBroken":"0",
        // "IsTesla":"0","PortType":"DCCCOMBOTYP1","AdditionalComments":"",
        // "Timestamp":"2019-11-13 21:20:28.397"}

        // <List.Icon name='heartbeat' color={'red'} />
        // <List.Content>
        //     <List.Header as='a'>Station Error</List.Header>
        //     <List.Description>
        //         Kapolei Commons
        //     </List.Description>
        // </List.Content>

        if (current.CardDeclined || current.CardReaderBroken) {
            return (
                <div>
                    {current.CardReaderBroken && <List.Item>
                        <List.Content>
                            <List.Header as='a'>
                        <List.Icon name='plug' color={'red'} />
                                Connection Error</List.Header>
                        <p style={{textAlign: 'left'}}>
                            {fromErrorLog && this.stationName(current.stationId)}
                            <br/>
                            {current.Timestamp}
                        </p>
                        </List.Content>
                    </List.Item>}
                    {current.CardDeclined && current.CardReaderBroken && <Divider />}
                    {current.CardDeclined && <List.Item>
                        <List.Content>
                            <List.Header as='a'>
                        <List.Icon name='credit card' color={'red'} />
                        Payment Error</List.Header>
                        <p style={{textAlign: 'left'}}>
                            {fromErrorLog && this.stationName(current.stationId)}
                            <br/>
                            {current.Timestamp}
                        </p>
                        </List.Content>
                    </List.Item>}
                    <Divider />
                </div>
            )
        } else {
            return ''
        }
    }

    stationName(id){
        if(id == 1){
            return 'Haleiwa Town Center';// Charging Station';
        } else {
            return 'Dole Plantation';// Charging Station';
        }
    }

    getStationHealthRender(id) {
        const data = this.state.stationHealth[id];

        if (data != undefined && data.length > 0) {
            const current = data.sort((a, b) => b.Timestamp - a.Timestamp)[0];
            console.log(current);
            if (current.CardDeclined || current.CardReaderBroken) {
                return (
                    <List style={{ paddingLeft: "2.4", margin: 0 }}>
                        {current.CardReaderBroken && <List.Item>
                            <p>{current.Timestamp}</p>
                            <List.Icon name='plug' color={'red'} />
                            <List.Content>
                                <List.Header as='a'>Connection Error</List.Header>
                            </List.Content>
                        </List.Item>}
                        {current.CardDeclined && current.CardReaderBroken && <Divider />}
                        {current.CardDeclined && <List.Item>
                            <p>{current.Timestamp}</p>
                            <List.Icon name='credit card' color={'red'} />
                            <List.Content>
                                <List.Header as='a'>Payment Error</List.Header>
                            </List.Content>
                        </List.Item>}
                    </List>
                )
            } else {
                return (
                    <ul style={{ paddingLeft: "2.4", margin: 0 }}>
                        <li>
                            All Good
                        </li>
                    </ul>
                )
            }
        } else {
            return (
                <div>No data available.</div>
            )
        }
    }

    unHealthy(id) {
        const data = this.state.stationHealth[id];

        if (data != undefined && data.length > 0) {
            const current = data.sort((a, b) => b.Timestamp - a.Timestamp)[0];
            if (current.CardDeclined || current.CardReaderBroken) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    handleHistoricalDataClick() {
        this.setState({ historical: true })
    }

    handleForecastDataClick() {
        this.setState({ historical: false })
    }

    showAllStations() {
        this.fetchHistorical(-1);
        this.fetchForecast(-1);
    }

    openSiteDetails(index) {
        let newIndex = this.state.activeIndex === index ? -1 : index;
        this.fetchHistorical(newIndex);
        this.fetchForecast(newIndex);
    }

    startHandleChange(date) {
        this.setState({
            startDate: date
        });
    };

    endHandleChange(date) {
        this.setState({
            endDate: date
        });
    };

    render() {

        let data = this.state.historical ? this.state.historicalData : this.state.forecastData;
        console.log(this.state.historicalData)

        let startIndex = 0;
        let endIndex = data['Timestamp'] !== undefined ? data['Timestamp'].length - 1 : 0;

        if (data['Timestamp'] !== undefined && this.state.historical) {

            const newData = {}

            for (let i = 0; i < data['Timestamp'].length; i += 1) {
                const parts = data['Timestamp'][i].split('-');
                const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
                if (date.getTime() === this.state.startDate.getTime()) {
                    startIndex = i;
                    console.log(date)
                    console.log(data['Timestamp'][startIndex])
                }
                if (date.getTime() === this.state.endDate.getTime()) {
                    endIndex = i;
                    console.log(date)
                    console.log(data['Timestamp'][endIndex])
                }
            }

            // const parts = data['Timestamp'][0].split('-')
            // const date = new Date(parts[0], parts[1], parts[2])

            // console.log(date)
            console.log(this.state.startDate);
            console.log(this.state.endDate);
            console.log(startIndex)
            console.log(endIndex)

            for (let key in data) {
                newData[key] = data[key].slice(startIndex, endIndex);
            }

            data = newData;
        }

        let totalRevenue = 0;
        if (data['Timestamp'] !== undefined) {
            if (this.state.historical) {
                totalRevenue = data['CorrectAmount'].reduce((a, b) => a + b, 0).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } else {
                const totalOnPeak = data['OnPeak'].reduce((a, b) => a + b, 0) 
                const totalOffPeak = data['OffPeak'].reduce((a, b) => a + b, 0) 
                const totalMidDay = data['MidDay'].reduce((a, b) => a + b, 0)
                const totalVehicles = totalOnPeak + totalOffPeak + totalMidDay
                const totalEnergy = data['Energy'].reduce((a, b) => a + b, 0)
                console.log(`Energy: ${totalEnergy} Vehicles: ${totalVehicles}`);
                totalRevenue = totalEnergy * (totalOnPeak*0.57/totalVehicles)  + totalEnergy * (totalOffPeak*0.49/totalVehicles)  + totalEnergy * (totalMidDay*0.54/totalVehicles) 
                console.log(`Revenue: ${totalRevenue}`);
                totalRevenue = totalRevenue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                console.log(`Revenue: ${totalRevenue}`);
            }

        }

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
            labels: data['Timestamp'],
            datasets: [
                {
                    label: 'Off Peak',
                    backgroundColor: '#3d4044',
                    stack: '2',
                    data: data['OffPeak'],
                },
                {
                    label: 'Mid Day',
                    backgroundColor: '#c2bd4e',
                    stack: '2',
                    data: data['MidDay'],
                },
                {
                    label: 'On Peak',
                    backgroundColor: '#59b655',
                    stack: '2',
                    data: data['OnPeak'],
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

        const portData = {
            labels: data['Timestamp'],
            datasets: [
                {
                    label: 'CHADEMO',
                    backgroundColor: '#c2bd4e',
                    stack: '2',
                    data: data['PortType_CHADEMO'],
                },
                {
                    label: 'DCCOMBOTYP1',
                    backgroundColor: '#59b655',
                    stack: '2',
                    data: data['PortType_DCCOMBOTYP1'],
                },
            ],
        };

        const paymentData = {
            labels: data['Timestamp'],
            datasets: [
                {
                    label: 'Credit Card',
                    backgroundColor: '#c2bd4e',
                    stack: '2',
                    data: data['PaymentMode_CreditCard'],
                },
                {
                    label: 'RFID',
                    backgroundColor: '#59b655',
                    stack: '2',
                    data: data['PaymentMode_RFID'],
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
                                    {/* <Image size='tiny' centered src="https://cdn.discordapp.com/attachments/635171758248296468/643610008332009472/favicon.png"/> */}
                                    <h1 className='heco'>HECO[EV] <Icon name='lightning' color='yellow' /></h1>
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
                                        <Grid.Row style={{ textAlign: 'center', paddingBottom: 15 }}>
                                            <Button size='small' color='grey' onClick={this.showAllStations}> Show All Stations</Button>
                                        </Grid.Row>
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
                                                    }} name='map marker' color={this.unHealthy(1) ? 'red' : 'green'} />
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
                                                    {this.getStationHealthRender(1)}
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
                                                    }} name='map marker' color={this.unHealthy(2) ? 'red' : 'green'} />
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
                                                    {this.getStationHealthRender(2)}
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
                                                <Button size='mini' color='green'
                                                    onClick={this.handleHistoricalDataClick}> <Icon
                                                        name='archive' /> Historical Data</Button>
                                                <Button.Or />
                                                <Button size='mini' color='blue' onClick={this.handleForecastDataClick}><Icon
                                                    name='chart bar' /> Forecasted Data</Button>
                                            </Button.Group>
                                            <Grid.Row>
                                                <Label pointing='right' color='grey'>
                                                    Start Date
                                                </Label>
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.startHandleChange}
                                                />
                                                <DatePicker
                                                    selected={this.state.endDate}
                                                    onChange={this.endHandleChange}
                                                />
                                                <Label pointing='left' color='grey'>
                                                    End Date
                                                </Label>
                                            </Grid.Row>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <h4 style={{ margin: 5 }}>Session Type</h4>
                                            <Bar data={sessionData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <h4 style={{ margin: 5 }}>Energy (kWh)</h4>
                                            <Line data={energyData} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <h4 style={{ margin: 5 }}>Payment System Errors</h4>
                                            <Bar data={errorData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <h4 style={{ margin: 5 }}>Station Usage</h4>
                                            <Bar data={trafficData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <h4 style={{ margin: 5 }}>Port Used</h4>
                                            <Bar data={portData} options={barStackedOptions} />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment inverted>
                                            <h4 style={{ margin: 5 }}>Payment Used</h4>
                                            <Bar data={paymentData} options={barStackedOptions} />
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
                                        {this.healthStats()}
                                        {/* <List.Item>
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
                                        </List.Item> */}
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
                                        size={75}
                                        foregroundColor={avgMeterStyle.color.foreground}
                                        backgroundColor={avgMeterStyle.color.background}
                                        textColor={avgMeterStyle.color.bright}
                                        style={avgMeterStyle.meter}
                                    />
                                </Grid.Row>
                            </Segment>
                            <Segment inverted>
                                <h4>Total Revenue</h4>
                                <Grid.Row style={{ textAlign: 'center', paddingBottom: 5 }}>
                                    {/* <Button.Group size='mini' color='grey'>
                                        <Button>Day</Button>
                                        <Button>Month</Button>
                                        <Button>Year</Button>
                                    </Button.Group> */}
                                </Grid.Row>
                                <h2 className='revenue'>${totalRevenue}</h2>
                                {/* <Grid.Row>
                                    <p className='pBold'>24% <Icon name='arrow circle down' size='small'
                                        color='red' /></p>
                                    <p>(from previous period)</p>
                                </Grid.Row> */}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Landing;
