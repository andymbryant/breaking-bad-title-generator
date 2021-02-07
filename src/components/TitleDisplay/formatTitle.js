import { v4 } from 'uuid';
import * as orderBy from 'lodash/orderBy'
import * as shuffle from 'lodash/shuffle'
import { elements } from '../../data/elementData'

/**
 * Helper function that checks if array has at least one object that has type 'element'
 * @param {array} array of title units
 */
function arrayHasElementUnit(arr) {
  if (!arr) return false
  return arr.filter(tu => tu.type === 'element').length
}

/**
 * Return pseudo-random id of specified length
 * @param {number} length length of returned id, greater than 0 and less than 32
 * @returns {string} the generated id
 */
function generateID(length=6) {
  if (0 > length > 32) {
    console.error('Length must be greater than 0 and less than 32')
    length = 4
  }
  return v4().split('-').join('').slice(1, length + 1)
}

/**
 * Returns a string split by a delimeter
 * @param {string} str the string to be split
 * @param {string} sep the separator for splitting the string
 * @returns {string} the split string
 */
function splitString(str, sep = ' ') {
  return str.split(sep)
}

/**
 * Returns an array of string objects, which contain either one or two-character substrings
 * of the original string arg, along with the corresponding indices of their occurrence within the string arg
 * @param {string} str
 * @param {boolean} randomize enables pseudo-random shuffling of items, using lodash shuffle function (Fisher-Yates)
 * @param {boolean} includeThreeCharStr optional flag for including three-character strings,
 * which would only access a single element: Ununennium
 * @returns {array} string object array
 */
function getStringObjectArray(str, randomize=true, includeThreeCharStr=false) {
  const strObjArr = []
  // Loop through all characters of the string arg
  for (let i = 0; i < str.length; i++) {
    const firstChar = str[i]
    const isElement = !!elements[firstChar]
    const oneCharStrObj = {
      str: firstChar,
      ind: [i],
      type: isElement ? 'element' : 'char'
    }
    strObjArr.push(oneCharStrObj)

    let j = i + 1
    if (j < str.length) {
      const secondChar = str[j]
      const twoCharStr = `${firstChar}${secondChar}`
      // Check if twoCharStr is a key of the elements object
      // If not, then it should be considered for inclusion in the final title
      const isElement = !!elements[twoCharStr]
      if (isElement) {
        const twoCharStrObj = {
          str: twoCharStr,
          ind: [i,j],
          type: 'element'
        }
        strObjArr.push(twoCharStrObj)
      }
    }

    // This block can be nested in the above if statement, but it makes it less legible
    if (includeThreeCharStr) {
      let k = j + 1
      if (k < str.length) {
        const secondChar = str[j]
        const thirdChar = str[k]
        const threeCharStr = `${firstChar}${secondChar}${thirdChar}`
      // Check if twoCharStr is a key of the elements object
      // If not, then it should be considered for inclusion in the final title
      const isElement = !!elements[threeCharStr]
      if (isElement) {
        const threeCharStrObj = {
          str: threeCharStr,
          ind: [i,j,k],
          type: 'element'
        }
        strObjArr.push(threeCharStrObj)
      }
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
    // If an element has already been added to arr, do not add any more two or three-char units
    if (arrayHasElementUnit(unformattedTitleUnitArr) && strObj.ind.length > 1) continue
    // If no string values are found in map, add them all
    if (!strObj.ind.some(i => strMap[i])) {
      // Add string object to array
      unformattedTitleUnitArr.push(strObj)
      // Mark the corresponding indices in the map
      strObj.ind.forEach(j => strMap[j] = true)
    }
  }
  return unformattedTitleUnitArr
  // return orderBy(unformattedTitleUnitArr, 'ind[0]')
}

function getStringMap(str) {
  // Initialize map for each index of the title
  const stringMap = {}
  for (let k = 0; k < str.length; k++) {
    stringMap[k] = false
  }
  return stringMap
}

/**
 * Returns a title unit object, which includes a title unit array and an id
 * A title unit array includes an id, the type of title unit, and the data needed to render a title unit (either element data or a string)
 * @param {string} str the string to be used for generating a title unit object
 * @returns {object} a title unit object
 */
function getTitleUnitObjectFromString(str) {
  const stringMap = getStringMap(str)
  const strObjArr = getStringObjectArray(str)
  const unformattedTitleUnitArr = getUnformattedTitleUnitArray(strObjArr, stringMap)
  let titleUnitArr = []
  for (let i = 0; i < unformattedTitleUnitArr.length; i++) {
    const unit = unformattedTitleUnitArr[i]
    // Get element from elements data by key
    const element = elements[unit.str]
    const isElement = !!element && !arrayHasElementUnit(titleUnitArr)
    const formattedTitleUnit = {
      id: generateID(),
      // If element exists, then return an element object, otherwise return a character object
      type: isElement ? 'element' : 'char',
      data: isElement ? element : {str: unit.str},
      ind: unit.ind
    }
    titleUnitArr.push(formattedTitleUnit)
  }

  return {
    id: generateID(),
    arr: orderBy(titleUnitArr, 'ind[0]')
  }
}

export { splitString, getTitleUnitObjectFromString, generateID }