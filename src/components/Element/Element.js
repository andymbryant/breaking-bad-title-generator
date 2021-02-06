import PropTypes from 'prop-types'
import './Element.css'

function Element({symbol}) {
  return <div className="element-ctr">{symbol}</div>
}

Element.propTypes = {
  symbol: PropTypes.string.isRequired
}

export default Element