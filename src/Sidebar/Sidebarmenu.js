import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarDate } from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';

function Sidebarmenu() {
    const [sidebar,setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return(
        <>
        <IconContext.Provider value={{color: 'black' }}>
        <div className='navbar'>
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onclick={showSidebar}>
                <li className="navbar-toggle">
                    
                </li>
                {SidebarDate.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
                
            </ul>
        </nav>
        </IconContext.Provider>

        </>
    )
}

export default Sidebarmenu;