import {useContext} from 'react'
import './TextInput.css'
import {TitleContext} from '../../contexts/TitleContext'
import {ConfigContext} from '../../contexts/ConfigContext'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

function TextInput() {
  const buttonStyle = {
    height: '100%'
  }
  // eslint-disable-next-line no-unused-vars
  const {title, titleDispatch} = useContext(TitleContext)
  const {config, configDispatch} = useContext(ConfigContext)
  const handleSetTitle = (e) => titleDispatch({type: 'SET_TITLE', payload: e.target.value})
  const handleToggleAllowMultpleElements = (e) => configDispatch({type: 'TOGGLE_ALLOW_MULTIPLE_ELEMENTS'})
  const handleToggleRandomSelection = (e) => configDispatch({type: 'TOGGLE_IS_ELEMENT_SELECTION_RANDOM'})
  const handleClearTitle = (e) => titleDispatch({type: 'CLEAR_TITLE'})
  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <TextField
          variant='filled'
          color='secondary'
          label='Enter Text'
          data-cy='text-input'
          inputProps={{
            spellCheck: false
          }}
          value={title}
          id='text-input'
          fullWidth={true}
          onChange={handleSetTitle}
          />
      </Grid>
      <Grid item xs={2}>
        <Button
          color='secondary'
          data-cy='clear-btn'
          variant='contained'
          style={buttonStyle}
          disabled={title === ''}
          onClick={handleClearTitle}
          >Clear
        </Button>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  )
}

export default TextInput