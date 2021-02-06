import {useContext, useRef} from 'react'
import './TextInput.css'
import {TitleContext} from '../../contexts/TitleContext'

function TextInput() {
  const inputEl = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const {title, dispatch} = useContext(TitleContext)
  // const handleSubmit = (e) => e.preventDefault()
  const handleSetTitle = (e) => dispatch({type: 'SET_TITLE', payload: e.target.value})
  const handleClearTitle = (e) => {
    e.preventDefault()
    dispatch({type: 'CLEAR_TITLE'})
  }
  return (
    <div className='text-input-ctr'>
      <label htmlFor="title-input">Enter Text</label>
      <input ref={inputEl} value={title} onChange={handleSetTitle} type="text" id='title-input'/>
      <button onClick={handleClearTitle}>Clear</button>
    </div>
  )
}

export default TextInput