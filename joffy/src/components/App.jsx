
import {BrowserRouter, Route, Routes } from "react-router";
import '../App.css'
import Login from './Login';
import Home from "./Home";

function App() {
  
  return ( 
<BrowserRouter>

    <Routes>

   <Route path="/login" element={<Login/>}/>
  
  <Route path="/" element={<Home/>}/>



  </Routes>


 </BrowserRouter>

    
  )
}
export default App;