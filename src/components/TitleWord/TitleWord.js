import TitleUnit from '../TitleUnit/TitleUnit'

// A title word is made up of either element or character components
function TitleWord({word}) {
  return (
    <div className='word-ctr'>
      {word.map(unit => <TitleUnit key={unit.id} {...unit}/>)}
    </div>
  )
}

export default TitleWord