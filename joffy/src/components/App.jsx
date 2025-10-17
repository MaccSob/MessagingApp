import Navbar from "./Navbar";
import Main from "./Main";
import Login from "./Login";
import {Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";
import Features from "./Features";
import Register from "./Register";

function App() {
    return (
        <>

<BrowserRouter>
<Navbar></Navbar>

<Routes>

<Route path="/" element={<Main/>}/> 
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Register/>}/> 
<Route path="/features" element={<Features/>}/>


</Routes>

</BrowserRouter>
        </>


    )
}

export default App;