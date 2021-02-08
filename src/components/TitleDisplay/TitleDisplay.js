import {useContext} from 'react'
import {TitleContext} from '../../contexts/TitleContext'
import {ConfigContext} from '../../contexts/ConfigContext'
import TitleWord from '../TitleWord/TitleWord'
import './TitleDisplay.css'
import { getTitleUnitArrayFromString } from '../../titleUnitFormat'
import * as cloneDeep from 'lodash/cloneDeep'

function TitleDisplay() {
  const {title} = useContext(TitleContext)
  const {config} = useContext(ConfigContext)
  if (!title) return null
  // Get array of title unit objects for rendering
  const titleUnitObjArr = getTitleUnitArrayFromString(title, config.allowMultipleElements, config.isElementSelectionRandom)
  return (
    <div className="title-ctr">
      {cloneDeep(titleUnitObjArr).map(obj => <TitleWord key={obj.id} titleUnits={obj.arr}/>)}
    </div>
  )
}

export default TitleDisplay