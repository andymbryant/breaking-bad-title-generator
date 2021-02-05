import { useState } from "react";
import './App.css';
import TitleDisplay from './TitleDisplay'
import TitleForm from './TitleForm'
import Footer from './Footer'
import {TitleContext, defaultTitleValue} from '../TitleContext'

function App() {
  const [title, setTitle] = useState(defaultTitleValue)
  return (
    <TitleContext.Provider value={[title, setTitle]}>
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
