import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'
import { VelocityComponent } from 'velocity-react'
import velocityHelpers from 'velocity-react/src/velocity-helpers'
import SpeechBubble from './SpeechBubble'

require('velocity-animate')
require('velocity-animate/velocity.ui')

const styles = StyleSheet.create({
  window: {
    width: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  lintel: {
    height: 5,
    backgroundColor: 'white',
    position: 'relative',
  },
  sash: {
    'height': 40,
    'backgroundColor': '#81A8CD',
    'border': 'white solid 2px',
    'position': 'relative',
    'marginLeft': 2,
    'marginRight': 2,
    ':before': {
      content: '""',
      position: 'absolute',
      top: 30,
      height: 2,
      width: '100%',
      backgroundColor: 'white',
      left: 0,
    },
  },
  sashOpen: {
    height: 20,
    transformOrigin: 'top center',
    transform: 'perspective(500px) rotateX(45deg)',
    background: 'linear-gradient(to bottom, rgba(242,246,248,0.2) 0%, rgba(224,239,249,0.5) 100%)',
  },
  sill: {
    height: 5,
    backgroundColor: '#fff',
    borderBottom: 'rgba(0,0,0,0.15) solid 2px',
  },
  user: {
    position: 'absolute',
    bottom: -8,
    zIndex: 2,
  },
})

const Animations = {
  up: velocityHelpers.registerEffect({
    defaultDuration: 200,
    calls: [
      [{
        transformOriginX: ['50%', '50%'],
        transformOriginY: ['100%', '100%'],
        scale: 1,
      }],
    ],
  }),
  down: velocityHelpers.registerEffect({
    defaultDuration: 200,
    calls: [
      [{
        transformOriginX: ['50%', '50%'],
        transformOriginY: ['100%', 0],
        scale: 0,
      }],
    ],
  }),
}

// eslint-disable-next-line
const getAvatar = (avatar) => require(`../../../assets/images/avatars/${avatar}.png`)

class Window extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
    }
  }
  whenMouseEntered = (event) => {
    event.preventDefault()
    this.setState({ isOpen: true })
  }
  whenMouseLeft = (event) => {
    event.preventDefault()
    this.setState({ isOpen: false })
  }
  render() {
    const { user, lastUserMessage, position } = this.props
    const isUserSpeaking = Boolean(lastUserMessage && user && user.id === lastUserMessage.user.id)

    return (
      // eslint-disable-next-line
      <div
        onMouseEnter={this.whenMouseEntered}
        onMouseLeave={this.whenMouseLeft}
        className={css(styles.window)}
      >
        <div className={css(styles.lintel)} />
        <div className={css(styles.sash)}>
          { user && (
            <div className={css(styles.user)}>
              <VelocityComponent
                animation={(isUserSpeaking) ? Animations.up : Animations.down}
                duration={300}
              >
                <SpeechBubble position={position} text={isUserSpeaking ? lastUserMessage.message : ''} />
              </VelocityComponent>
              <img
                alt={user.name}
                className={css(styles.userImg)}
                src={getAvatar(user.avatar)}
                width={36}
              />
            </div>
          ) }
          <div className={css(styles.sashOpen)} />
        </div>
        <div className={css(styles.sill)} />

      </div>
    )
  }
}

Window.propTypes = {
  position: PropTypes.string,
  lastUserMessage: PropTypes.object,
  user: PropTypes.object,
}

export default Window
