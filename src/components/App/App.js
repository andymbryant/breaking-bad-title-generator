import { useReducer } from "react";
import TitleDisplay from '../TitleDisplay/TitleDisplay'
import TextInput from '../TextInput/TextInput'
import Footer from '../Footer/Footer'
import BackgroundImage from '../BackgroundImage/BackgroundImage'
import Grid from '@material-ui/core/Grid';
import {TitleContext} from '../../contexts/TitleContext'
import {ConfigContext} from '../../contexts/ConfigContext'
import {configReducer, defaultConfigState} from '../../reducers/configReducer'
import {titleReducer, defaultTitleState} from '../../reducers/titleReducer'


function App() {
  const appCtrStyle = {
    height: '100vh',
    width: '100vw',
    position: 'absolute'
  }
  const contentCtrStyle = {
    position: 'relative',
    padding: '1rem',
    top: '20%'
  }
  const [config, configDispatch] = useReducer(configReducer, defaultConfigState)
  const [title, titleDispatch] = useReducer(titleReducer, defaultTitleState)
  return (
    <ConfigContext.Provider value={{config, configDispatch}}>
      <TitleContext.Provider value={{title, titleDispatch}}>
        <BackgroundImage/>
        <Grid container style={appCtrStyle} justify='center'>
          <Grid item xs={12} sm={10} md={8} lg={6} style={contentCtrStyle}>
            <TextInput/>
            <TitleDisplay/>
          </Grid>
        </Grid>
        <Footer />
      </TitleContext.Provider>
    </ConfigContext.Provider>
  );
}

export default App;
