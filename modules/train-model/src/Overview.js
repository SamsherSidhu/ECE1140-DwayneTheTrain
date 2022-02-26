import React from 'react'
import { Container, Row, Table } from 'react-bootstrap'
import OverviewTrain from './OverviewTrain'

export default class Overview extends React.Component {
  render () {
    return (
      <Container fluid>
        <Row>
          <Table striped bordered hover size='sm' responsive>
            <thead>
              <tr>
                <th>Train ID</th>
                {/* vital state */}
                <th>Speed<br />(mph)</th>
                <th>Accel<br />(mph/s)</th>
                <th>Power<br />(kW)</th>
                {/* critical systems */}
                <th>Engine</th>
                <th>Brakes</th>
                <th>Signal<br />Pickup</th>
                {/* non-vital state */}
                <th>Doors</th>
                <th>Lights</th>
                <th>Temp<br />(°F)</th>
                <th>Crew</th>
                <th>Passengers</th>
                {/* thru information */}
                <th>SpeedCmd<br />(mph)</th>
                <th>Authority<br />(blocks)</th>
                <th>Station</th>
                <th>Platform</th>
                <th>Underground</th>
              </tr>
            </thead>
            <tbody>
              {this.props.trains.map((t) => <OverviewTrain train={t} key={t.trainId} />)}
            </tbody>
          </Table>
        </Row>
      </Container>
    )
  }
}
