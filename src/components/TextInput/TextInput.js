import {useContext, useRef} from 'react'
import './TextInput.css'
import {TitleContext} from '../../contexts/TitleContext'

function TextInput() {
  const inputEl = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const {title, dispatch} = useContext(TitleContext)
  const handleSetTitle = (e) => dispatch({type: 'SET_TITLE', payload: e.target.value})
  const handleClearTitle = (e) => {
    e.preventDefault()
    dispatch({type: 'CLEAR_TITLE'})
  }
  return (
    <div className='text-input-ctr'>
      <label className='text-input-label' htmlFor="text-input">Enter Text</label>
      <input data-cy='text-input' ref={inputEl} value={title} onChange={handleSetTitle} type="text" id='text-input'/>
      <button data-cy='clear-btn' onClick={handleClearTitle}>Clear</button>
    </div>
  )
}

export default TextInput