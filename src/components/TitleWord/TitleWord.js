import ElementUnit from '../ElementUnit/ElementUnit'
import CharacterUnit from '../CharacterUnit/CharacterUnit'
import PropTypes from 'prop-types'
import titleUnitTypes from '../../titleUnitTypes'

// A title word is made up of either element or character components
function TitleWord({titleUnits}) {
  return (
    <div className='word-ctr'>
      {titleUnits.map(unit => {
        if (unit.type === titleUnitTypes.ELEMENT) {
          return  <ElementUnit key={unit.id} {...unit.data}/>
        }
        return <CharacterUnit key={unit.id} {...unit.data}/>
      })
    }
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