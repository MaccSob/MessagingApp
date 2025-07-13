
import {Routes, Router, Route} from "react-router-dom";
import './App.css'
import Login from './Login';

function App() {
  
  return ( 
    <Router>

    <Routes>

   <Route path="/login" element={<Login/>}></Route>

  



  </Routes>


    </Router>

    
  )
}
export default App;