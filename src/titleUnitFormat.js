import { v4 } from 'uuid';
import * as orderBy from 'lodash/orderBy'
import * as shuffle from 'lodash/shuffle'
import { elements } from './data/elementData'
import TUT from './titleUnitTypes'

/**
 * Helper function that checks if array has at least one object that has type 'element'
 * @param {array} array of title units
 */
function arrayHasElementUnit(arr) {
  if (!arr) return false
  if (!arr.length) return false
  return arr.filter(tu => tu.type === TUT.ELEMENT).length
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
 * @param {string} string the string to be split
 * @param {string} sep the separator for splitting the string
 * @returns {string} the split string
 */
function splitString(string, sep = ' ') {
  return string.split(sep)
}

/**
 * Returns an array of string objects, which contain either one or two-character substrings
 * of the original string arg, along with the corresponding indices of their occurrence within the string arg
 * @param {string} str
 * @param {boolean} isSelectionRandom make the selection of elements random (if false, it is first matched)
 * @param {boolean} includeThreeCharStr optional flag for including three-character strings,
 * which would only access a single element: Ununennium
 * @returns {array} string object array
 */
function getStringObjectArray(string, isSelectionRandom, includeThreeCharStr=true) {
  const strObjArr = []
  // Loop through all characters of the string arg
  for (let i = 0; i < string.length; i++) {
    const firstChar = string[i]
    const isElement = !!elements[firstChar.toLowerCase()]
    const oneCharStrObj = {
      str: firstChar,
      ind: [i],
      type: isElement ? TUT.ELEMENT : TUT.CHARACTER
    }
    strObjArr.push(oneCharStrObj)

    let j = i + 1
    if (j < string.length) {
      const secondChar = string[j]
      const twoCharStr = `${firstChar}${secondChar}`
      // Check if twoCharStr is a key of the elements object
      // If not, then it should be considered for inclusion in the final title
      const isElement = !!elements[twoCharStr.toLowerCase()]
      if (isElement) {
        const twoCharStrObj = {
          str: twoCharStr,
          ind: [i,j],
          type: TUT.ELEMENT
        }
        strObjArr.push(twoCharStrObj)
      }
    }

    // This block can be nested in the above if statement, but it makes it less legible
    if (includeThreeCharStr) {
      let k = j + 1
      if (k < string.length) {
        const secondChar = string[j]
        const thirdChar = string[k]
        const threeCharStr = `${firstChar}${secondChar}${thirdChar}`
      // Check if twoCharStr is a key of the elements object
      // If not, then it should be considered for inclusion in the final title
      const isElement = !!elements[threeCharStr.toLowerCase()]
      if (isElement) {
        const threeCharStrObj = {
          str: threeCharStr,
          ind: [i,j,k],
          type: TUT.ELEMENT
        }
        strObjArr.push(threeCharStrObj)
      }
    }
    }
  }
  const elementsFirst = orderBy(strObjArr, (obj) => obj.str.length, ['desc'])
  if (isSelectionRandom) {
    return shuffle(elementsFirst)
  }
  return elementsFirst
}

/**
 * Returns an array of title units (string objects) in order of their ultimate appearance in the formatted title.
 * Loops through string object array (one or two-character substrings of original string) and confirms that all of their values
 * can be added to the final title, i.e. their addition would not result in any duplicate values in the final formatted title
 * @param {array} strObjArr array of string object
 * @param {object} strMap object with integer keys for each index in a string
 * @param {boolean} allowMultipleElements allow multiple elements to be selected in each word
 * @returns {array} array of unformatted title unit objects, ordered by first index
 */
function getUnformattedTitleUnitArray(strObjArr, strMap, allowMultipleElements = false) {
  let unformattedTitleUnitArr = []
  // Loop through each string object in the array arg
  for (let i = 0; i < strObjArr.length; i++) {
    const strObj = strObjArr[i]
    // If an element has already been added to arr, do not add any more two or three-char units
    if (!allowMultipleElements) {
      if (arrayHasElementUnit(unformattedTitleUnitArr) && strObj.ind.length > 1) continue
    }
    // If no string values are found in map, add them all
    if (!strObj.ind.some(i => strMap[i])) {
      // Add string object to array
      unformattedTitleUnitArr.push(strObj)
      // Mark the corresponding indices in the map
      strObj.ind.forEach(j => strMap[j] = true)
    }
  }
  // Put element units in front with longest values to ensure that if an element exists, it will appear in display
  const elementsFirst = orderBy(unformattedTitleUnitArr, ['type'], ['desc'])
  return orderBy(elementsFirst, (tu) => tu.str.length, ['desc'])
}

function getStringMap(string) {
  // Initialize map for each index of the title
  const stringMap = {}
  for (let k = 0; k < string.length; k++) {
    stringMap[k] = false
  }
  return stringMap
}

/**
 * Returns a title unit object, which includes a title unit array and an id
 * A title unit array includes an id, the type of title unit, and the data needed to render a title unit (either element data or a string)
 * @param {string} string the string to be used for generating a title unit object
 * @param {boolean} allowMultipleElements allow multiple elements to be selected in each word
 * @param {boolean} isSelectionRandom make the selection of elements random (if false, it is first matched)
 * @returns {object} a title unit object
 */
function getTitleUnitObjectFromString(string, allowMultipleElements, isSelectionRandom) {
  // If the input is an element, return it as an object immediately
  let element = elements[string.toLowerCase()]
  if (!!element) {
    return {
      id: generateID(),
      arr: [
        {
          id: generateID(),
          type: TUT.ELEMENT,
          data: element,
          ind: []
        }
      ]
    }
  }
  // if (string.length === 5) debugger
  const stringMap = getStringMap(string)
  const strObjArr = getStringObjectArray(string, isSelectionRandom)
  const unformattedTitleUnitArr = getUnformattedTitleUnitArray(strObjArr, stringMap, allowMultipleElements)
  let titleUnitArr = []
  for (let i = 0; i < unformattedTitleUnitArr.length; i++) {
    const unit = unformattedTitleUnitArr[i]
    // Get element from elements data by key
    element = elements[unit.str.toLowerCase()]
    let isElement
    if (allowMultipleElements) {
      isElement = !!element
    } else {
      isElement = !!element && !arrayHasElementUnit(titleUnitArr)
    }
    const formattedTitleUnit = {
      id: generateID(),
      // If element exists, then return an element object, otherwise return a character object
      type: isElement ? TUT.ELEMENT : TUT.CHARACTER,
      data: isElement ? element : {str: unit.str},
      ind: unit.ind
    }
    titleUnitArr.push(formattedTitleUnit)
    console.log(titleUnitArr)
  }
  return {
    id: generateID(),
    arr: orderBy(titleUnitArr, (tu) => tu.ind[0])
  }
}

/**
 * Returns an array of title unit objects, which are of type ELEMENT or CHARACTER
 * @param {string} string
 * @returns {object} array of title unit objects
 */
function getTitleUnitArrayFromString(string, allowMultipleElements = false, isSelectionRandom=true) {
  // Split text string into array on space (if any)
  const titleStrArr = splitString(string)
  if (!titleStrArr.length) return []
  // Get array of title unit objects for rendering
  return titleStrArr.map((word) => getTitleUnitObjectFromString(word, allowMultipleElements, isSelectionRandom))
}

export { getTitleUnitArrayFromString }