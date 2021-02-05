import Element from '../Element/Element'
import Char from '../Char/Char'
function TitleUnit({type, data}) {
  return type === 'element' ? <Element {...data}/> : <Char {...data}/>
}

export default TitleUnit