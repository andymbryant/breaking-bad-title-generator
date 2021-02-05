import TitleUnit from '../TitleUnit/TitleUnit'

function TitleWord({word}) {
  return (
    <div className='word-ctr'>
      {word.map(unit => <TitleUnit key={unit.id} {...unit}/>)}
    </div>
  )
}

export default TitleWord