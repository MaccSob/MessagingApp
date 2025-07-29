import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../Sidebar.css';
import { IconContext } from 'react-icons';

const Sidebar = () => {
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >
                <img src={Icon} alt="icon" className="logo" />
                <h2 className="title">evergreen. </h2>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "profileContainer"
                        : "profileContainer active"
                }
            >
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello, John👋</p>
                    <p>johnsmith@gmail.com</p>
                </div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <img src={Dashboard} alt="dashboard" />
                        <a href="/">dashboard</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/transactions"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={Transactions} alt="transactions" />
                        <a href="/transactions">transactions</a>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Sidebar;