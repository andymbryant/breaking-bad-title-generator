import {useContext} from 'react'
import {TitleContext} from '../../contexts/TitleContext'
import TitleWord from '../TitleWord/TitleWord'
import './TitleDisplay.css'
import { getTitleUnitArrayFromString } from './formatTitle'

function TitleDisplay() {
  const {title} = useContext(TitleContext)

  // Split title into strings by spaces
  const titleStrings = title.split(' ')
  if (!titleStrings.length) return
  const titleWordsFormatted = titleStrings.map((word) => getTitleUnitArrayFromString(word))

  return (
    <div className="title-ctr">
      {/* TODO: generate key for word array */}
      {titleWordsFormatted.map(word => <TitleWord key={word} word={word}/>)}
    </div>
  )
}

export default TitleDisplay