import ElementUnit from '../ElementUnit/ElementUnit'
import CharUnit from '../CharUnit/CharUnit'
import PropTypes from 'prop-types'

// A title word is made up of either element or character components
function TitleWord({titleUnits}) {
  return (
    <div className='word-ctr'>
      {titleUnits.map(unit => unit.type === 'element' ? <ElementUnit key={unit.id} {...unit.data}/> : <CharUnit key={unit.id} {...unit.data}/>)}
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