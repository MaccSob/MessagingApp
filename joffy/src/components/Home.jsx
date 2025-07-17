
import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
 return (
   <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
</div>

<button class="btn btn-primary" onClick={() => navigate('/register')}>Click me!</button>       







   
   
   
   
   
   </>
    







 )
   




};

export default Home;




    