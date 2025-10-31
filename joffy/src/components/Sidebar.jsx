import '../Sidebar.css';
import { FaMessage, FaUser } from "react-icons/fa6";
import { Link } from 'react-router';

const Sidebar = () => {


    return (
<>
 <div className="fixed top-0 left-0 h-screen w-24 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
        <Link to={'/messages'}> Messages</Link>
         <Link to={'/profile'}>Profile   </Link>
         <button>Log out</button>
         

         <SidebarIcon icon={<FaMessage size="32"/>}/>
                  <SidebarIcon icon={<FaUser size="28"/> }/>

</div>



</>
        
    )
}

const SidebarIcon = ({icon}) => (
    <div className="sidebar-icon">

        {icon}
    </div>
)
export default Sidebar;