import Element from '../Element/Element'
import Char from '../Char/Char'
function TitleUnit({type, data}) {
  const unit = type === 'element' ? <Element {...data}/> : <Char {...data}/>
  return (
    <div>{unit}</div>
  )
}

export default TitleUnit