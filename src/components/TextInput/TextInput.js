import {useContext} from 'react'
import './TextInput.css'
import {TitleContext} from '../../contexts/TitleContext'
import {ConfigContext} from '../../contexts/ConfigContext'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

function TextInput() {
  const buttonStyle = {
    height: '100%'
  }
  const textInputStyle = {
    marginRight: '1rem'
  }
  // eslint-disable-next-line no-unused-vars
  const {title, titleDispatch} = useContext(TitleContext)
  const {config, configDispatch} = useContext(ConfigContext)
  const handleSetTitle = (e) => titleDispatch({type: 'SET_TITLE', payload: e.target.value})
  const handleToggleAllowMultpleElements = (e) => configDispatch({type: 'TOGGLE_ALLOW_MULTIPLE_ELEMENTS'})
  const handleToggleRandomSelection = (e) => configDispatch({type: 'TOGGLE_IS_ELEMENT_SELECTION_RANDOM'})
  const handleClearTitle = (e) => titleDispatch({type: 'CLEAR_TITLE'})
  return (
    <Container fluid>
      <div className='text-input-ctr'>
        <TextField
          variant='filled'
          color='secondary'
          label='Enter Text'
          data-cy='text-input'
          style={textInputStyle}
          inputProps={{
            spellCheck: false
          }}
          value={title}
          id='text-input'
          fullWidth={true}
          onChange={handleSetTitle}
          />
        <Button
          color='secondary'
          data-cy='clear-btn'
          variant='contained'
          style={buttonStyle}
          disabled={title === ''}
          onClick={handleClearTitle}
          >Clear
        </Button>
      </div>
      <div>
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleToggleAllowMultpleElements}
            checked={config.allowMultipleElements}
          />
        }
        label='Allow Multiple Elements'
        />
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleToggleRandomSelection}
            checked={config.isElementSelectionRandom}
          />
        }
        label='Random Element Selection'
        />
      </div>
    </Container>
  )
}

export default TextInput