
import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";


function Main() {
  const navigate = useNavigate();
 return (
   <>
        <div className="mainwrapper">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Joffy"
              src='/src/assets/logo.png'
              className="logo"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Here to talk!  
            </h2>
            <h3></h3>
           
          </div>
          <button class="btn btn-primary" onClick={() => navigate('/register')}>Click me!</button>       

</div>








   
   
   
   
   
   </>
    







 )
   




};

export default Main;




    