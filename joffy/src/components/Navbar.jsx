
import '../Navbar.css';
import { Link } from 'react-router';
import { Router } from 'react-router';
import { useNavigate } from "react-router";



const Navbar = () => {
  let navigate = useNavigate();
    return (
        <>

        <div className='wrapper'>
        <nav>

   <img src="/src/assets/logo.png" alt="logo" srcset="" />

        <ul>
         <li> <Link to={'/features'}> Features  </Link></li>
         <li> <Link to={'/blog'}>Blog   </Link></li>
         <li> <Link to={'/about'}>  About </Link></li>
        </ul>

        <button className='btn' onClick={() => navigate('/signup')}>Join Us!</button>

        </nav>
        </div>
        
        
        </>
    )

}
export default Navbar;