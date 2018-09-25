import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import ToolTip from 'react-portal-tooltip'

import statusValues from 'constants/status'

import './styles.sass'

class Station extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isTooltipActive: false,
    }

    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.hideTooltip)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.highlighted) {
      this.showTooltip()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.hideTooltip)
  }

  showTooltip() {
    this.setState({ isTooltipActive: true })
  }

  hideTooltip() {
    this.setState({ isTooltipActive: false })
  }

  render() {
    const {
      id, name, availableBikes, status, highlighted,
    } = this.props

    return (
      <div>
        <div
          id={id}
          className={cx({
            baik__Station: true,
            'baik__Station--available': (status === statusValues.AVAILABLE && availableBikes === -1) || availableBikes > 0,
            'baik__Station--highlighted': highlighted,
          })}
          onClick={this.showTooltip}
        >
          {availableBikes === -1 ? '...' : this.props.availableBikes}
        </div>

        {availableBikes !== -1 && (
          <ToolTip
            active={this.state.isTooltipActive}
            position="top"
            arrow="center"
            parent={`#${this.props.id}`}
          >
            <div>
              <strong>{name}</strong>
            </div>
            <span>Disponibles: {availableBikes}</span>
          </ToolTip>
        )}
      </div>
    )
  }
}

Station.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  availableBikes: PropTypes.number,
  highlighted: PropTypes.bool,
  status: PropTypes.string,
}

Station.defaultProps = {
  id: null,
  availableBikes: -1,
  highlighted: false,
  status: statusValues.DISABLED,
}

export default Station
