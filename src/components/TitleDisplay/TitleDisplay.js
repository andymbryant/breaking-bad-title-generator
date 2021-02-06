import {useContext} from 'react'
import {TitleContext} from '../../contexts/TitleContext'
import TitleWord from '../TitleWord/TitleWord'
import './TitleDisplay.css'
import { splitString, getTitleUnitObjectFromString  } from './formatTitle'

function TitleDisplay() {
  const {title} = useContext(TitleContext)

  // Split text string into array on space (if any)
  const titleStrArr = splitString(title)
  if (!titleStrArr.length) return
  // Get array of title unit objects for rendering
  const titleUnitObjectArray = titleStrArr.map((word) => getTitleUnitObjectFromString(word))

  return (
    <div className="title-ctr">
      {titleUnitObjectArray.map(obj => <TitleWord key={obj.id} titleUnits={obj.arr}/>)}
    </div>
  )
}

export default TitleDisplay