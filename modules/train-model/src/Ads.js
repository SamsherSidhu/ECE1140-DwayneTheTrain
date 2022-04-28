import React from 'react'
import JungleCruise from './JungleCruise.png'
import RedNotice from './RedNotice.png'
import HobbsAndShaw from './HobbsAndShaw.png'

export default class Ads extends React.Component {
  constructor (props) {
    super(props)
    this.state = { adSrc: RedNotice, adNum: 1 }
  }

  // Change which ad is displayed every 15 seconds
  // We are advertising recent movies starring our namesake, Dwayne "The Rock" Johnson
  componentDidMount () {
    setInterval(() => {
      if (this.state.adNum === 1) {
        this.setState({ adSrc: JungleCruise, adNum: 2 })
      } else if (this.state.adNum === 2) {
        this.setState({ adSrc: HobbsAndShaw, adNum: 3 })
      } else if (this.state.adNum === 3) {
        this.setState({ adSrc: RedNotice, adNum: 1 })
      }
      console.log(this.state.adNum)
    }, 15000)
  }

  render () {
    return (
      <>
        <img src={this.state.adSrc} />
      </>
    )
  }
}
