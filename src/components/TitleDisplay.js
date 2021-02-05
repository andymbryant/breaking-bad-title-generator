import {useContext} from 'react'
import {TitleContext} from '../TitleContext'
import TitleUnit from './TitleUnit'
import { v4 } from 'uuid';

function TitleDisplay() {
  const [title] = useContext(TitleContext)
  // Search title text for element match
  // Get array of
  const formattedTitle = title.split('').map(char => {
    const elements = {
      'n': {
        number: 12,
        mass: 52.1
      },
      'k': {
        number: 3,
        mass: 98.1
      },

    }
    const symbol = elements[char]
    const type = symbol ? 'element' : 'char'
    const value = symbol || char
    return {
      id: v4(),
      type,
      value
    }
  })

  console.log(formattedTitle)
  return (
    formattedTitle.map(unit => <TitleUnit key={unit.id} unit={unit}/>)
  )
}

export default TitleDisplay