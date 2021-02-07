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
import './App.css'


function App() {
  const appCtrStyle = {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    minWidth: '320px'
  }
  const [config, configDispatch] = useReducer(configReducer, defaultConfigState)
  const [title, titleDispatch] = useReducer(titleReducer, defaultTitleState)
  return (
    <ConfigContext.Provider value={{config, configDispatch}}>
      <TitleContext.Provider value={{title, titleDispatch}}>
        <BackgroundImage/>
        <Grid container style={appCtrStyle} justify='center'>
          <div className='content-ctr'>
            <TextInput/>
            <TitleDisplay/>
          </div>
          <Footer />
        </Grid>
      </TitleContext.Provider>
    </ConfigContext.Provider>
  );
}

export default App;
