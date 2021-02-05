import './Element.css'
function Element({number}) {
  console.log(number)
  return (
    <div className="element-ctr">
      <h1>{number}</h1>
    </div>
  )
}

export default Element