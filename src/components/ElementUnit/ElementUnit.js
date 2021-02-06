import PropTypes from 'prop-types'
import './ElementUnit.css'

function ElementUnit({symbol}) {
  return <div className="element-unit-ctr">{symbol}</div>
}

ElementUnit.propTypes = {
  symbol: PropTypes.string.isRequired
}

export default ElementUnit