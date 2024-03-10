import Navbar from "./components/Navbar";
import Button from "./components/Button";
import Grid from './components/Grid';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState('');

  useEffect(()=> {
    axios.get('http://localhost:5000/api/get')
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data)
      })
      .catch((err) => console.log(err))
  }, [updateUI])

  return (
    <div className="App">
      <Navbar></Navbar>
      <Grid photos={photos}></Grid>
      <Button setUpdateUI={setUpdateUI}></Button>
    </div>
  );
}

export default App;
