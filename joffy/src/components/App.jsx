import Navbar from "./Navbar";
import Login from "./Login";
import {Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";
import Features from "./Features";
import Register from "./Register";
import Blog from "./Blog";
import About from "./About";

function App() {
    return (
        <>

<BrowserRouter>
<Navbar></Navbar>

<Routes>

<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Register/>}/> 
<Route path="/features" element={<Features/>}/>
<Route path="/blog" element={<Blog/>}/> 
<Route path="/about" element={<About/>}/> 


</Routes>

</BrowserRouter>
        </>


    )
}

export default App;