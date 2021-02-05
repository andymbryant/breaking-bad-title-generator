import { useReducer } from "react";
import TitleDisplay from '../TitleDisplay/TitleDisplay'
import TitleForm from '../TitleForm/TitleForm'
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
          <TitleForm/>
          <TitleDisplay/>
        </div>
        <Footer />
      </div>
    </TitleContext.Provider>
  );
}

export default App;
