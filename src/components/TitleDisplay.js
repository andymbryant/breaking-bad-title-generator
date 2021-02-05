import {useContext} from 'react'
import {TitleContext} from '../TitleContext'

function TitleDisplay() {
  const [title] = useContext(TitleContext)

  return (
    <h1>{title}</h1>
  )
}

export default TitleDisplay