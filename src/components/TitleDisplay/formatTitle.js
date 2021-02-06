import { v4 } from 'uuid';
import * as orderBy from 'lodash/orderBy'
import {elements} from '../../data/elementData'


function getStringObjectArray(string) {
  // Get all one-character and two-character substrings from title
  // Keep track of the indices at which each char occurs in the title
  const stringArray = []
  for (let i = 0; i < string.length; i++) {
    const firstChar = string[i]
    const oneCharData = {
      str: firstChar,
      ind: [i]
    }
    stringArray.push(oneCharData)

    let j = i + 1
    if (j < string.length) {
      const secondChar = string[j]
      const str = `${firstChar}${secondChar}`
      // Only add those two-character substrings that are also element keys,
      // Two-character substrings can only be element keys,
      // One-character substrings can either be element keys or characters in the final array
      if (elements[str]) {
        const twoCharData = {
          str,
          ind: [i,j]
        }
        stringArray.push(twoCharData)
      }
    }
  }
  return stringArray
}

// Shuffle result to make order pseudo-random
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(arr) {
  return arr
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
}

function getUnformattedTitleUnitArray(stringArray, stringMap) {
  let unformattedMixedArr = []
  // Loop through each string object in shuffled arrays
  // If none of its indices are found in titleMap, add them to final array
  // And update titleMap to track which indices have been filled
  for (let i = 0; i < stringArray.length; i++) {
    const val = stringArray[i]
    const ind = val.ind
    let addStringToTitle = true
    ind.forEach(ind => {
      if (stringMap[ind]) {
        addStringToTitle = false
      }
    })
    if (addStringToTitle) {
      ind.forEach(ind => {
        stringMap[ind] = true
      })
      unformattedMixedArr.push(val)
    }
  }
  // Order by index, i.e. put array of mixed character sequences in order of title appearance
  return orderBy(unformattedMixedArr, 'ind[0]')
}

function getStringMap(string) {
  // Initialize map for each index of the title
  const stringMap = {}
  for (let k = 0; k < string.length; k++) {
    stringMap[k] = false
  }
  return stringMap
}

function getTitleUnitArrayFromString(string) {
  const stringMap = getStringMap(string)
  const stringObjectArray = getStringObjectArray(string)
  const shuffledStringObjectArray = shuffleArray(stringObjectArray)
  let unformattedTitleUnitArray = getUnformattedTitleUnitArray(shuffledStringObjectArray, stringMap)
  const titleUnitArray = unformattedTitleUnitArray.map(unit => {
    const element = elements[unit.str]
    return {
      id: v4(),
      type: element ? 'element' : 'char',
      data: element ? element : {str: unit.str}
    }
  })
  return titleUnitArray
}

export { getTitleUnitArrayFromString }