import React from 'react'
import { Button, Card, Container, Row, Col, ToggleButton, ButtonGroup, Form, DropdownButton, Dropdown } from 'react-bootstrap'
const { ipcRenderer } = window.require('electron')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { exists: false, speed: 0, temp: 68, cmdSpeed: 0, actSpeed: 0 , eBrake: false, sBrake: false, authority: 0, kI: 0, kP: 0, automatic: false }
  }
  msToMph (val) {
    return val * 2.2369
  }

  componentDidMount () {
    ipcRenderer.on('SendData', (event, arg) => {
      if (arg.exists) {
        this.setState({ exists: arg.exists, id: arg.train.id, speed: arg.train.speed, temp: arg.train.temp, sBrake: arg.train.sBrake,
          eBrake: arg.train.eBrake, cmdSpeed: this.msToMph(arg.train.cmdSpeed), actSpeed: this.msToMph(arg.train.actSpeed), authority: arg.train.authority, 
          location: arg.train.location, kI: arg.train.kI, kP: arg.train.kP, automatic: arg.train.automatic, ids: arg.ids })}
      else {
        this.setState({exists: arg.exists})
      }})
    this.intervalID = setInterval(() => { ipcRenderer.send('RequestData')}, 50)
  }

  render () {
    const authUp = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('authorityUp') }}>⇧</Button> : ''
    const authDown = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('authorityDown') }}>⇩</Button> : ''
    const actUp = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('actSpeedUp') }}>⇧</Button> : ''
    const actDown = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('actSpeedDown') }}>⇩</Button> : ''
    const cmdUp = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('cmdSpeedUp') }}>⇧</Button> : ''
    const cmdDown = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('cmdSpeedDown') }}>⇩</Button> : ''
    const KpUp = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('KpUp') }}>⇧</Button> : ''
    const KpDown = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('KpDown') }}>⇩</Button> : ''
    const KiUp = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('KiUp') }}>⇧</Button> : ''
    const KiDown = testUI ? <Button variant='outline-dark' onClick={() => { ipcRenderer.send('KiDown') }}>⇩</Button> : ''

    const stat = this.state.automatic

    if (this.state.exists) {return (
      <div>
        <DropdownButton title={'Train ' + this.state.id} size='sm' style={{ marginBottom: 10 + 'px' }}>
        {this.state.ids.map((t) => (t !== this.state.id) ? (<Dropdown.Item key={t} onClick={() => { ipcRenderer.send('selectTrain', t) }}>Train {t}</Dropdown.Item>) : '')}
        </DropdownButton>

        <body>
          <Container>
            <Row>
              <h2>Authority</h2>
              <Col>
                <Card style={{ width: '15rem' }}>
                  <Card.Body>{this.state.authority} BLOCKS</Card.Body>
                </Card>
              </Col>
              <Col>
                {authUp} &nbsp;
                {authDown}
              </Col>
              <Col>
                <ButtonGroup>
                  <ToggleButton type='radio' variant={!this.state.automatic ? 'secondary' : 'outline-secondary'} onClick={() =>{ ipcRenderer.send('manualMode') }}>MANUAL</ToggleButton>
                  <ToggleButton type='radio' variant={this.state.automatic ? 'secondary' : 'outline-secondary'} onClick={() => {ipcRenderer.send('automaticMode') }}>AUTOMATIC</ToggleButton>
                </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <h2>Actual Speed</h2>
            </Row>
            <Row>
              <Col>
                <Card style={{ width: '15rem' }}>
                  <Card.Body>{this.state.actSpeed} MPH</Card.Body>
                </Card>
              </Col>
              <Col>
                {actUp} &nbsp;
                {actDown}
              </Col>
              </Row>  
            <Row>
              <h2>Commanded Speed</h2>
            </Row>
            <Row>
              <Col>
                <Card style={{ width: '15rem' }}>
                  <Card.Body>{this.state.cmdSpeed} MPH</Card.Body>
                </Card>
              </Col>
              <Col>
                {cmdUp} &nbsp;
                {cmdDown}
              </Col>
            </Row>
            <Row>
              <Row>
                <h2>Desired Speed</h2>
              </Row>
              <Row>
                <Col>
                  <Card style={{ width: '15rem' }}>
                    <Card.Body>{this.state.speed} MPH</Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Button disabled={stat} variant='outline-dark' onClick={() => { ipcRenderer.send('spdUp') }}>⇧</Button> &nbsp;
                  <Button disabled={stat} variant='outline-dark' onClick={() => { ipcRenderer.send('spdDown') }}>⇩</Button>
                </Col>
                <Col>
                  <Button 
                    variant='primary' onClick={() => { ipcRenderer.send('serBrake', !this.state.sBrake) }}>{this.state.sBrake ? 'Disengage Brake' : 'BRAKE'}
                  </Button>
                </Col>
                <Col>
                  <Button 
                    variant='danger' onClick={() => { ipcRenderer.send('emerBrake', !this.state.eBrake) }}>{this.state.eBrake ? 'Disengage E-Brake' : 'EMERGENCY BRAKE'}
                  </Button>
                </Col>
              </Row>
            </Row>
            <Row>
              <h2>Temperature</h2>
            </Row>
            <Row>
              <Col>
                <Card style={{ width: '15rem' }}>
                  <Card.Body>{this.state.temp} &deg;F</Card.Body>
                </Card>
              </Col>
              <Col>
                <Button variant='outline-dark' onClick={() => { ipcRenderer.send('tempUp') }}>⇧</Button> &nbsp;
                <Button variant='outline-dark' onClick={() => { ipcRenderer.send('tempDown') }}>⇩</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Kp</h2>
                  <Row>
                    <Col>
                      <Card style={{ width: '10rem' }}>
                        <Card.Body>{this.state.kP}</Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      {KpUp} &nbsp;
                      {KpDown}
                    </Col>
                  </Row>
              </Col>  
              <Col>
                <h2>Ki</h2>
                <Row>
                  <Card style={{ width: '10rem' }}>
                    <Card.Body>{this.state.kI}</Card.Body>
                  </Card>
                  <Col>
                      {KiUp} &nbsp;
                      {KiDown}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Location</h2>
                <Card style={{ width: '15rem' }}>
                  <Card.Body>{this.state.location}</Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Lights</h2>
                <Form.Check type='switch' disabled = {stat} defaultChecked={false} onClick={e => { ipcRenderer.send('lightsOnOff', e.target.checked) }} width={10}/>
              </Col>
              <Col>
                <h2>Left Door</h2>
                <Form.Check type='switch' disabled = {stat} defaultChecked={false}  onClick={e => { ipcRenderer.send('leftDoor', e.target.checked) }} width={80} onlabel='Open' offlabel='Close' />
              </Col>
              <Col>
                <h2>Right Door</h2>
                <Form.Check type='switch' disabled = {stat} defaultChecked={false}  onClick={e => { ipcRenderer.send('rightDoor', e.target.checked) }} width={80} onlabel='Open' offlabel='Close' />
              </Col>
            </Row>
          </Container>
          <script src='trainController.js' />
        </body>
      </div>
    )}
    else {
      return (<div><p>No Trains</p></div>)
    }
  }
}

export default App
