import { useReducer } from "react";
import TitleDisplay from '../TitleDisplay/TitleDisplay'
import TextInput from '../TextInput/TextInput'
import Footer from '../Footer/Footer'
import {TitleContext} from '../../contexts/TitleContext'
import {titleReducer, defaultTitleValue} from '../../reducers/titleReducer'
import './App.css';

function App() {
  const [title, dispatch] = useReducer(titleReducer, defaultTitleValue)
  return (
    <TitleContext.Provider value={{title, dispatch}}>
      <div className="background-img">
        <div className="title-content">
          <TextInput/>
          <TitleDisplay/>
        </div>
        <Footer />
      </div>
    </TitleContext.Provider>
  );
}

export default App;
