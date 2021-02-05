import Element from '../Element/Element'
function TitleUnit({type, value, id}) {
  if (type === 'element') {
    return <Element {...value}/>
  } else {
    return <h1>{value}</h1>
  }
}

export default TitleUnit