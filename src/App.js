import './App.css';

function App() {
  return (
    <div className="background-img">
      <div className="content">
        <form action="" id='title-form'>
          <label htmlFor="title-input">Enter Text</label>
          <input type="text" id='title-input'/>
        </form>
      </div>
      <footer><span className='page-title'>Breaking Bad Title Generator - © 2021 Andy Bryant</span></footer>
    </div>
  );
}

export default App;
