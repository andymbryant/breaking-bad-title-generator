import { v4 } from 'uuid';
import * as orderBy from 'lodash/orderBy'
import elementData from '../../data/elementData'
const elements = elementData.elements

const getFormattedWord = (word) => {

    // Get all one-character and two-character substrings from title
    // Keep track of the indices at which each char occurs in the title
    const oneCharStrArr = []
    const twoCharStrArr = []
    for (let i = 0, j = 1; i < word.length; i++, j++) {
      const firstChar = word[i]
      const oneCharData = {
        str: firstChar,
        ind: [i]
      }
      oneCharStrArr.push(oneCharData)
      if (j < word.length) {
        const secondChar = word[j]
        const str = `${firstChar}${secondChar}`
        // Only add those two-character substrings that are also element keys,
        // Two-character substrings can only be element keys,
        // One-character substrings can either be element keys or characters in the final array
        if (elements[str]) {
          const twoCharData = {
            str,
            ind: [i,j]
          }
          twoCharStrArr.push(twoCharData)
        }
      }
    }
    // Combine one-character and two-character arrays
    // Shuffle result to make order pseudo-random
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const shuffledStrArr = [oneCharStrArr, twoCharStrArr].flat()
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    console.log(shuffledStrArr)

    // Initialize map for each index of the title
    const wordMap = {}
    for (let k = 0; k < word.length; k++) {
      wordMap[k] = false
    }

    let unformattedMixedArr = []
    // Loop through each string object in shuffled arrays
    // If none of its indices are found in titleMap, add them to final array
    // And update titleMap to track which indices have been filled
    for (let i = 0; i < shuffledStrArr.length; i++) {
      const val = shuffledStrArr[i]
      const ind = val.ind
      let addStringToTitle = true
      ind.forEach(ind => {
        if (wordMap[ind]) {
          addStringToTitle = false
        }
      })
      if (addStringToTitle) {
        ind.forEach(ind => {
          wordMap[ind] = true
        })
        unformattedMixedArr.push(val)
      }
    }
    // Order by index, i.e. put array of mixed character sequences in order of title appearance
    unformattedMixedArr = orderBy(unformattedMixedArr, 'ind[0]')

    const wordUnits = unformattedMixedArr.map(unit => {
      const element = elements[unit.str]
      const value = element ? element : {str: unit.str}
      const type = element ? 'element' : 'char'
      return {
        id: v4(),
        type,
        data: value
      }
    })
    return wordUnits
}

export {getFormattedWord}