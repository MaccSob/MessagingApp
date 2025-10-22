import Navbar from "./Navbar";
import Login from "./Login";
import {Routes, Route } from "react-router";
import { BrowserRouter } from "react-router";
import Features from "./Features";
import Home from "./Home";
import Register from "./Register";
import Blog from "./Blog";
import About from "./About";
import Messages from "./Messages";

function App() {
    return (
        <>

<BrowserRouter>


<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/messages" element={<Messages/>}/>
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