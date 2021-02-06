import PropTypes from 'prop-types'
import './CharUnit.css'

function CharUnit({str}) {
  return <div className='char-unit-ctr'>{str}</div>
}

CharUnit.propTypes = {
  str: PropTypes.string.isRequired
}

export default CharUnit