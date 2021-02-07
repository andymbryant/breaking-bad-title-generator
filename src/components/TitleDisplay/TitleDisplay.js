import {useContext} from 'react'
import {TitleContext} from '../../contexts/TitleContext'
import {ConfigContext} from '../../contexts/ConfigContext'
import TitleWord from '../TitleWord/TitleWord'
import './TitleDisplay.css'
import { getTitleUnitArrayFromString } from '../../titleUnitFormat'

function TitleDisplay() {
  const {title} = useContext(TitleContext)
  const {config} = useContext(ConfigContext)
  // Get array of title unit objects for rendering
  const titleUnitObjectArray = getTitleUnitArrayFromString(title, config.allowMultipleElements)

  return (
    <div className="title-ctr">
      {titleUnitObjectArray.map(obj => <TitleWord key={obj.id} titleUnits={obj.arr}/>)}
    </div>
  )
}

export default TitleDisplay