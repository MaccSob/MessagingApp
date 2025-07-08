
import {Router, Routes, Route} from 'react-router';
import './App.css'
import Login from './Login';

function App() {
    return (
      <>
<Router>
<Routes>

<Route path="/login" element={Login}></Route>

</Routes>

</Router>
      </>
        )
      }
export default App
