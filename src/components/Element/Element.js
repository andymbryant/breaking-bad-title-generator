import './Element.css'
function Element({symbol}) {
  return (
    <div className="element-ctr">
      <div>{symbol}</div>
    </div>
  )
}

export default Element