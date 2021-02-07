import PropTypes from 'prop-types'
import './ElementUnit.css'


function ElementUnit({symbol}) {
  return <div className="element-unit-ctr title-unit">{symbol}</div>
}

ElementUnit.propTypes = {
  symbol: PropTypes.string.isRequired
}

export default ElementUnit