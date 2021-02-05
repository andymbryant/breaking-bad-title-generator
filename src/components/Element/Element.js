import './Element.css'
function Element({symbol}) {
  return (
    <div className="element-ctr">
      <h1>{symbol}</h1>
    </div>
  )
}

export default Element