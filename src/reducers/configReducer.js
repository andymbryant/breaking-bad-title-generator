export const defaultConfigState = {
  allowMultipleElements: false,
  isElementSelectionRandom: true
}

export const configReducer = (state, {type, payload}) => {
  switch (type) {
    case 'TOGGLE_ALLOW_MULTIPLE_ELEMENTS':
      return {
        ...state,
        allowMultipleElements: !state.allowMultipleElements
      }
    case 'TOGGLE_IS_ELEMENT_SELECTION_RANDOM':
      return {
        ...state,
        isElementSelectionRandom: !state.isElementSelectionRandom
      }
    default:
      console.error('Unkown action type')
      return state;
  }
}
