import {useContext, useRef} from 'react'
import './TitleForm.css'
import {TitleContext, defaultTitleValue} from '../TitleContext'

function TitleInput() {
  const inputEl = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useContext(TitleContext)
  const handleSetTitle = (e) => setTitle(e.target.value)
  const handleClearTitle = (e) => {
    e.preventDefault()
    inputEl.current.value = defaultTitleValue
    setTitle(defaultTitleValue)
  }
  return (
    <form id='title-form'>
      <label htmlFor="title-input">Enter Text</label>
      <input ref={inputEl} onChange={handleSetTitle} type="text" id='title-input'/>
      <button onClick={handleClearTitle}>Clear</button>
    </form>
  )
}

export default TitleInput