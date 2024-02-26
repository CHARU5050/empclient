import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Create from "./Create";
import Table from './Table';
import Analysis from './Analysis';
import axios from 'axios';
axios.defaults.baseURL = "https://197f-51-20-85-206.ngrok-free.app/";
axios.defaults.headers = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "69420"
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes >
      <Route path="/employee" element={<Table/>}></Route>
        <Route path="/" element={<Create/>}></Route>
        <Route path="/analysis" element={<Analysis></Analysis>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
