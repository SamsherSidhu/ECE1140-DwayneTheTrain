//////NOTES//////
//note on line 108
//create class with all these function except for get functions
//remove 'export function' from all function names for correct syntax

// Export functions
export default class TrainController {
  constructor() {
    // Input Variables
    this.cmdSpeed = 0
    this.actSpeed = 0
    this.authority = 0
    this.kP = 0
    this.kI = 0
    this.temp = 68
    this.speed = 0
    this.eBrake = false
    this.sBrake = false
    this.lights = false
    this.leftD = false
    this.rightD = false
    this.automatic = false
    this.location = "Location"
    // Calculated Variables
    this.cumErr = 0
    this.err = 0
    this.power = 0
  }

  // UI Functions
  // Increase speed
  spdUp () {
    this.speed = this.speed + 1
    if (this.speed > 43) {
      this.speed = 43
    }
    console.log(this.speed)
    return this.speed
  }
  // Decrease speed
    spdDown () {
    this.speed = this.speed - 1
    if (this.speed < 0) {
      this.speed = 0
    }
    console.log(this.speed)
    return this.speed
  }
  // Emergency Brake
  emerBrake () {
    this.eBrake = true
    return this.eBrake
  }
  // Service Brake
  serBrake () {
    this.sBrake = true
    return this.sBrake
  }
  // Increase temperature
  tempUp () {
    this.temp = this.temp + 1
    if (this.temp > 80) {
      this.temp = 80
    }
    console.log(this.temp)
    return this.temp
  }
  // Decrease temperature
  tempDown () {
    this.temp = this.temp - 1
    if (this.temp < 62) {
      this.temp = 62
    }
    console.log(this.temp)
    return this.temp
  }
  // Turn lights on/off
  lightsOnOff (e) {
    this.lights = e   //remove .target.checked and just call e for all check function 
    return this.lights
  }
  // Left door
  leftDoor (e) {
    this.leftD = e
      return this.leftD
  }
  // Right door
  rightDoor (e) {
    this.rightD = e
      return this.rightD
  }
  //Send location
  showLocation () {
      if(this.spd === 0 && this.eBrake === false) {
          return this.location
      }
  }
  //Increase Kp
  KpUp () {
      this.kP = this.kP + 1
      console.log(this.kP)
      return this.kP
  }
  //Decrease Kp
  KpDown () {
      this.kP = this.kP - 1
      if (this.kP < 0) {
        this.kP = 0
      }
      console.log(this.kP)
      return this.kP
  }
  //Increase Ki
  KiUp () {
      this.kI = this.kI + 1
      console.log(this.kI)
      return this.kI
  }
  //Decrease Ki
  KiDown () {
      this.kI = this.kI - 1
      if (this.kI < 0) {
        this.kI = 0
      }
      console.log(this.kI)
      return this.kI
  }
  //Increase authority 
  authorityUp () {
      this.authority = this.authority + 1
      return this.authority
  }
  //Decrease authority
  authorityDown () {
      this.authority = this.authority - 1
      if(this.authority < 0) {
          this.authority = 0
      }
      return this.authority
  }
  //Increase actual speed
  actSpeedUp () {
      this.actSpeed = this.actSpeed + 1
      return this.actSpeed
  }
  //Decrease actual speed
  actSpeedDown () {
      this.actSpeed = this.actSpeed - 1
      if(this.actSpeed < 0) {
          this.actSpeed = 0
      }
      return this.actSpeed
  }
  //Increase commanded speed
  cmdSpeedUp () {
      this.cmdSpeed = this.cmdSpeed + 1
      return this.cmdSpeed
  }
  //Decrease commanded speed
  cmdSpeedDown () {
      this.cmdSpeed = this.cmdSpeed - 1
      if(this.cmdSpeed < 0) {
          this.cmdSpeed = 0
      }
      return this.cmdSpeed
  }
  //Choose automatic
  automaticMode () {
      this.automatic = true
      return this.automatic
  }
  //Choose manual
  manualMode () {
      this.automatic = false
      return this.automatic
  }

  // Backlog Functions
  // Velocity Error
  error () {
    this.err = this.cmdSpeed - this.actSpeed
  }
  // Cumulative Error
  cumError (err) {
    this.cumErr = this.cumErr + this.err
  }
  // Power Calculation
  powerCalc (err, cumErr) {
    this.power = this.err * this.kP + this.cumErr * this.kI
    return this.power
  }
}
