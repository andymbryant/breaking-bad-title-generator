import {useContext} from 'react'
import {TitleContext} from '../TitleContext'
import TitleUnit from './TitleUnit'
import { v4 } from 'uuid';
import * as orderBy from 'lodash/orderBy'

function TitleDisplay() {
  const [title] = useContext(TitleContext)
  // Search title text for element match
  // Get array of
  const elements = {
    'n': {
      number: 12,
      mass: 52.1
    },
    'k': {
      number: 3,
      mass: 98.1
    }
  }
  const formattedTitle = title.split('').map(char => {
    const symbol = elements[char]
    const type = symbol ? 'element' : 'char'
    const value = symbol || char


    // Get all single values
    // Keep track of their index in the base string
    // Get all consecutive

    return {
      id: v4(),
      type,
      value
    }
  })

  let j = 1;
  const oneChar = []
  const twoChar = []
  for (let i = 0; i < title.length; i++, j++) {
    const firstChar = title[i]
    const oneData = {
      str: firstChar,
      ind: [i]
    }
    oneChar.push(oneData)
    if (j < title.length) {
      const secondChar = title[j]
      const twoData = {
        str: `${firstChar}${secondChar}`,
        ind: [i,j]
      }
      twoChar.push(twoData)
    }
  }
  const shuffled = [oneChar, twoChar].flat()
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

  const titleMap = {}
  for (let i = 0; i < title.length; i++) {
    titleMap[i] = false
  }
  const all = []
  for (let i = 0; i < shuffled.length; i++) {
    const val = shuffled[i]
    const ind = val.ind
    let addStringToTitle = true
    ind.forEach(ind => {
      if (titleMap[ind]) {
        addStringToTitle = false
      }
    })
    if (addStringToTitle) {
      ind.forEach(ind => {
        titleMap[ind] = true
      })
      all.push(val)
    }
  }
  console.log(orderBy(all, 'ind'))


  // console.log(formattedTitle)
  return (
    formattedTitle.map(unit => <TitleUnit key={unit.id} unit={unit}/>)
  )
}

export default TitleDisplay