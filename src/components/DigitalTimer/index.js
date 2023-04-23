import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimeRunning: false,
    minutesTime: 25,
    secondsTime: 0,
  }

  increaseTime = () => {
    const {isTimeRunning} = this.state
    if (isTimeRunning === false) {
      this.setState(prevState => ({
        minutesTime: prevState.minutesTime + 1,
      }))
    }
  }

  decreaseTime = () => {
    const {isTimeRunning, minutesTime} = this.state
    if (isTimeRunning === false && minutesTime > 1) {
      this.setState(prevState => ({
        minutesTime: prevState.minutesTime - 1,
      }))
    }
  }

  startTimerInterval = () => {
    const {secondsTime, minutesTime} = this.state

    if (secondsTime > 0 && minutesTime >= 0) {
      this.setState(prevState => ({
        secondsTime: prevState.secondsTime - 1,
      }))
    } else {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false, minutesTime: 25, secondsTime: 0})
    }

    if (secondsTime === 1) {
      this.setState({secondsTime: 59})
    }
  }

  startTimerInterval2 = () => {
    const {minutesTime} = this.state

    if (minutesTime > 0) {
      this.setState(prevState => ({minutesTime: prevState.minutesTime - 1}))
    } else {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false, minutesTime: 25, secondsTime: 0})
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.secondsTimerInterval)
    clearInterval(this.minutesTimerInterval)
  }

  startOrPauseTimer = () => {
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))

    const {isTimeRunning} = this.state

    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.setState({secondsTime: 59})
      this.setState(prevState => ({minutesTime: prevState.minutesTime - 1}))
      this.secondsTimerInterval = setInterval(this.startTimerInterval, 1000)
      this.minutesTimerInterval = setInterval(
        this.startTimerInterval2,
        1000 * 59,
      )
    }
  }

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimeRunning: false, minutesTime: 25, secondsTime: 0})
  }

  render() {
    const {isTimeRunning, minutesTime, secondsTime} = this.state
    const timerStatus = isTimeRunning ? 'Running' : 'Paused'
    const playOrPauseImage = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playOrPauseText = isTimeRunning ? 'Pause' : 'Start'
    const playOrPauseAlt = isTimeRunning ? 'pause icon' : 'play icon'
    const minutes = minutesTime > 9 ? minutesTime : `0${minutesTime}`
    const seconds = secondsTime > 9 ? secondsTime : `0${secondsTime}`

    return (
      <div className="main-container">
        <div className="container">
          <h1>Digital Timer</h1>
          <div className="div">
            <div className="clock-container">
              <div className="round">
                <h1>{`${minutes}:${seconds}`}</h1>
                <p>{timerStatus}</p>
              </div>
            </div>
            <div className="div2">
              <div className="start-pause">
                <button
                  onClick={this.startOrPauseTimer}
                  className="play-button"
                  type="button"
                >
                  <img
                    className="image"
                    src={playOrPauseImage}
                    alt={playOrPauseAlt}
                  />
                  <p>{playOrPauseText}</p>
                </button>

                <button
                  onClick={this.resetTimer}
                  className="play-button"
                  type="button"
                >
                  <img
                    className="image"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p>Reset</p>
                </button>
              </div>
              <p>Set Timer Limit</p>
              <div className="div">
                <button
                  onClick={this.decreaseTime}
                  className="plus-minus"
                  type="button"
                >
                  -
                </button>
                <p>{minutesTime}</p>
                <button
                  onClick={this.increaseTime}
                  className="plus-minus"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
