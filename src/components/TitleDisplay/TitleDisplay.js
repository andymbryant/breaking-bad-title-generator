import {useContext} from 'react'
import {TitleContext} from '../../contexts/TitleContext'
import TitleWord from '../TitleWord/TitleWord'
import './TitleDisplay.css'
import {getFormattedWord} from './formatTitle'

function TitleDisplay() {
  const {title} = useContext(TitleContext)

  const titleWords = title.split(' ')
  const titleWordsFormatted = titleWords.map((word) => getFormattedWord(word))

  return (
    <div className="title-ctr">
      {titleWordsFormatted.map(word => <TitleWord word={word}/>)}
    </div>
  )
}

export default TitleDisplay