import '../Sidebar.css';

import { Link } from 'react-router';

const Sidebar = () => {


    return (
<>
 <h1 class="text-3xl font-bold underline">    Hello world!  </h1>
 <div className="fixed top-0 left-0 h-screen w-24 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
         <ul>
         <li> <Link to={'/messages'}> Messages</Link></li>
         <li> <Link to={'/profile'}>Profile   </Link></li>
         <button>Log out</button>
        </ul>
</div>

</>
        
    )
}
export default Sidebar;