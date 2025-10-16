
import '../Navbar.css';


const Navbar = () => {

    return (
        <>

        <div className='wrapper'>
        <nav>

   <img src="/src/assets/logo.png" alt="logo" srcset="" />

        <ul>
            <li>Features</li>
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