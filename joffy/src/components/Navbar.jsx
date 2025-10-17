
import '../Navbar.css';
import { Link } from 'react-router';
import { Router } from 'react-router';



const Navbar = () => {

    return (
        <>

        <div className='wrapper'>
        <nav>

   <img src="/src/assets/logo.png" alt="logo" srcset="" />

        <ul>
         <Link to={'/login'}> <li>Features</li> </Link>
            <li>Blog</li>
            <li>About Us</li>
            <li>Download</li>
        </ul>

        <button className='btn'>Log In</button>

        </nav>
        </div>
        
        
        </>
    )

}
export default Navbar;