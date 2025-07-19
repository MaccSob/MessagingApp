
import {BrowserRouter, Route, Routes } from "react-router";
import '../App.css'
import Login from './Login';
import Main from "./Main";
import Home from "./Home";
import Register from "./Register";

function App() {
  
  return ( 
<BrowserRouter>

    <Routes>

   <Route path="/login" element={<Login/>}/>
  
  <Route path="/" element={<Main/>}/> 

   <Route path="/home" element={<Home/>}/> 

    <Route path="/register" element={<Register/>}/>



  </Routes>


 </BrowserRouter>

    
  )
}
export default App;