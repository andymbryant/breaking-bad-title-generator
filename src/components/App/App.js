import { useReducer } from "react";
import TitleDisplay from '../TitleDisplay/TitleDisplay'
import TextInput from '../TextInput/TextInput'
import Footer from '../Footer/Footer'
import {TitleContext} from '../../contexts/TitleContext'
import {ConfigContext} from '../../contexts/ConfigContext'
import {configReducer, defaultConfigState} from '../../reducers/configReducer'
import {titleReducer, defaultTitleState} from '../../reducers/titleReducer'
import './App.css';


function App() {
  const [config, configDispatch] = useReducer(configReducer, defaultConfigState)
  const [title, titleDispatch] = useReducer(titleReducer, defaultTitleState)
  return (
    <ConfigContext.Provider value={{config, configDispatch}}>
      <TitleContext.Provider value={{title, titleDispatch}}>
        <div className="background-img">
          <div className="title-content">
            <TextInput/>
            <TitleDisplay/>
          </div>
          <Footer />
        </div>
      </TitleContext.Provider>
    </ConfigContext.Provider>
  );
}

export default App;
