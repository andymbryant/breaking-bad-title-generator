import Element from '../Element/Element'
import Char from '../Char/Char'
import PropTypes from 'prop-types'

// A title word is made up of either element or character components
function TitleWord({titleUnits}) {
  return (
    <div className='word-ctr'>
      {titleUnits.map(unit => unit.type === 'element' ? <Element key={unit.id} {...unit.data}/> : <Char key={unit.id} {...unit.data}/>)}
    </div>
  )
}

TitleWord.propTypes = {
  titleUnits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  }))
}

export default TitleWord