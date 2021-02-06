import {useContext} from 'react'
import './TextInput.css'
import {TitleContext} from '../../contexts/TitleContext'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function TextInput() {
  const buttonStyle = {
    height: '100%'
  }
  const textInputStyle = {
    color: 'green',
    marginRight: '1rem'
  }
  // eslint-disable-next-line no-unused-vars
  const {title, dispatch} = useContext(TitleContext)
  const handleSetTitle = (e) => dispatch({type: 'SET_TITLE', payload: e.target.value})
  const handleClearTitle = (e) => {
    e.preventDefault()
    dispatch({type: 'CLEAR_TITLE'})
  }
  return (
    <div className='text-input-ctr'>
      {/* <input data-cy='text-input' value={title} onChange={handleSetTitle} type="text" id='text-input'/> */}
      <TextField
        variant='outlined'
        label='Enter Text'
        data-cy='text-input'
        style={textInputStyle}
        value={title}
        id='text-input'
        fullWidth={true}
        onChange={handleSetTitle}
      />
      <Button
        color='red'
        data-cy='clear-btn'
        variant='contained'
        style={buttonStyle}
        disabled={title === ''}
        onClick={handleClearTitle}
      >Clear</Button>
    </div>
  )
}

export default TextInput