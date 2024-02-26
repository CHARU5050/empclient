import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Create from "./Create";
import Table from './Table';
import Analysis from './Analysis';

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
