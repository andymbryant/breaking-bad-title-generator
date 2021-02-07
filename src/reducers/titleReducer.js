export const defaultTitleState = ''

export const titleReducer = (state, {type, payload}) => {
  switch (type) {
    case 'SET_TITLE':
      return payload
    case 'CLEAR_TITLE':
      return defaultTitleState
    default:
      console.error('Unkown action type')
      return state;
  }
}