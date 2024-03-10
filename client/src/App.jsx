import Main from './components/Main';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={'/home'} />}/>
        <Route path='/home' element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
