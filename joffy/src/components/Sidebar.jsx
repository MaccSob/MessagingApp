import '../Sidebar.css';
import { Link } from 'react-router';

const Sidebar = () => {


    return (
<>
 <div className="fixed top-0 left-0 h-screen w-32 m-0 flex flex-col bg-gray-900 shadow-lg">
        <Link to={'/messages'}> Messages</Link>
         <Link to={'/profile'}>Profile   </Link>
         <button>Log out</button>

</div>



</>
        
    )
}

export default Sidebar;