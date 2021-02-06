
import Element from '../Element/Element'
import Char from '../Char/Char'

// A title word is made up of either element or character components
function TitleWord({titleUnits}) {
  console.log(titleUnits)
  return (
    <div className='word-ctr'>
      {titleUnits.map(unit => unit.type === 'element' ? <Element key={unit.id} {...unit.data}/> : <Char key={unit.id} {...unit.data}/>)}
    </div>
  )
}

export default TitleWord