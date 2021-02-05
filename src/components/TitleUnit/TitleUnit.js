import Element from '../Element/Element'
function TitleUnit({unit}) {
  if (unit.type === 'element') {
    return <Element {...unit.value}/>
  } else {
    return <h1>{unit.value}</h1>
  }
}

export default TitleUnit