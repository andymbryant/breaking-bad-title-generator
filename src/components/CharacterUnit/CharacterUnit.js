import PropTypes from 'prop-types'
import './CharacterUnit.css'

function CharacterUnit({str}) {
  return <div className='character-unit-ctr'>{str}</div>
}

CharacterUnit.propTypes = {
  str: PropTypes.string.isRequired
}

export default CharacterUnit