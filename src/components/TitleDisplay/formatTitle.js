import { v4 } from 'uuid';
import * as orderBy from 'lodash/orderBy'
import * as shuffle from 'lodash/shuffle'
import {elements} from '../../data/elementData'

function getID(length=6) {
  if (1 > length > 10) {
    console.error('Length must be greater than 0 and less than 10')
  }
  return v4().slice(1, length + 1)
}

function splitString(str) {
  return str.split(' ')
}

/**
 * Returns an array of string objects, which contain either one or two-character substrings
 * of the original string arg, along with the corresponding indices of their occurrence within the string arg
 * @param {string} str
 * @param {boolean} randomize enables pseudo-random shuffling of items, using lodash shuffle function (Fisher-Yates)
 * @returns {array} string object array
 */
function getStringObjectArray(str, randomize=true) {
  const strObjArr = []
  // Loop through all characters of the string arg
  for (let i = 0; i < str.length; i++) {
    const firstChar = str[i]
    const oneCharStrObj = {
      str: firstChar,
      ind: [i]
    }
    strObjArr.push(oneCharStrObj)

    let j = i + 1
    if (j < str.length) {
      const secondChar = str[j]
      const twoCharStr = `${firstChar}${secondChar}`
      // Check if twoCharStr is a key of the elements object
      // If not, then it should be considered for inclusion in the final title
      if (elements[twoCharStr]) {
        const twoCharStrObj = {
          str: twoCharStr,
          ind: [i,j]
        }
        strObjArr.push(twoCharStrObj)
      }
    }
  }
  if (randomize) {
    return shuffle(strObjArr)
  }
  return strObjArr
}

/**
 * Returns an array of title units (string objects) in order of their ultimate appearance in the formatted title.
 * Loops through string object array (one or two-character substrings of original string) and confirms that all of their values
 * can be added to the final title, i.e. their addition would not result in any duplicate values in the final formatted title
 * @param {array} strObjArr array of string object
 * @param {object} strMap object with integer keys for each index in a string
 * @returns {array} array of unformatted title unit objects, ordered by first index
 */
function getUnformattedTitleUnitArray(strObjArr, strMap) {
  let unformattedTitleUnitArr = []
  // Loop through each string object in the array arg
  for (let i = 0; i < strObjArr.length; i++) {
    const strObj = strObjArr[i]
    // If no string values are found in map, add them all
    if (!strObj.ind.some(i => strMap[i])) {
      // Add string object to array
      unformattedTitleUnitArr.push(strObj)
      // Mark the corresponding indices in the map
      strObj.ind.forEach(j => strMap[j] = true)
    }
  }
  return orderBy(unformattedTitleUnitArr, 'ind[0]')
}

function getStringMap(str) {
  // Initialize map for each index of the title
  const stringMap = {}
  for (let k = 0; k < str.length; k++) {
    stringMap[k] = false
  }
  return stringMap
}

function getTitleUnitObjectFromString(str) {
  const stringMap = getStringMap(str)
  const strObjArr = getStringObjectArray(str)
  const unformattedTitleUnitArr = getUnformattedTitleUnitArray(strObjArr, stringMap)
  const titleUnitArray = unformattedTitleUnitArr.map(unit => {
    // Get element from elements data by key
    const element = elements[unit.str]
    return {
      id: getID(),
      // If element exists, then return an element object, otherwise return a character object
      type: element ? 'element' : 'char',
      data: element ? element : {str: unit.str}
    }
  })
  return {
    id: getID(),
    arr: titleUnitArray
  }
}

export { splitString, getTitleUnitObjectFromString }