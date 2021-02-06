import PropTypes from 'prop-types'
import './Char.css'

function Char({str}) {
  return <div className='char-ctr'>{str}</div>
}

Char.propTypes = {
  str: PropTypes.string.isRequired
}

export default Char